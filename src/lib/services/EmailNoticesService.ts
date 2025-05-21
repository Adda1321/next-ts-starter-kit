import BaseService from '@/src/lib/services/BaseService';
import {
  Agenda,
  EmailNoticeTemplate,
  PrismaClient,
  TemplateType,
} from '@prisma/client';
import {BadRequestError} from '@/src/errors';
import {UpsertEmailNoticeTemplateInput} from './types/EmailNotice';
import {ALLOWED_VARIABLES} from '@/constants';
import {currentYear, productName, senderEmail} from '../email-sender/constants';
import {sendSingleEmail} from '../email-sender/sendSingleEmail';
import {formatDateTime} from '../helpers/formatDateTime';

export default class EmailNoticesService extends BaseService {
  private allowedVariables = ALLOWED_VARIABLES;

  constructor(client: PrismaClient) {
    super(client);
  }

  async upsertEmailNoticeTemplate(
    input: UpsertEmailNoticeTemplateInput,
    createdByUserId: string,
  ): Promise<EmailNoticeTemplate> {
    const {
      companyId,
      shelfId,
      type = TemplateType.AGENDA_NOTICE,
      subject,
      body,
      useShelfNotice = false,
    } = input;
    try {
      if (shelfId) {
        const bookshelf = await this.client.bookshelf.findUnique({
          where: {id: shelfId},
        });

        if (!bookshelf) {
          throw new BadRequestError('Invalid shelfId');
        }
      }

      const company = await this.client.company.findUnique({
        where: {id: companyId},
      });

      if (!company) {
        throw new BadRequestError('Invalid companyId');
      }

      const variables = this.extractVariables(body);

      const invalidVariables = variables.filter(
        (v) => !this.allowedVariables.includes(v),
      );

      if (invalidVariables.length > 0) {
        throw new BadRequestError(
          `Invalid variables: ${invalidVariables.join(', ')}`,
        );
      }

      const select = {
        id: true,
        companyId: true,
        shelfId: true,
        type: true,
        subject: true,
        body: true,
        variables: true,
        useShelfNotice: true,
        createdAt: true,
        updatedAt: true,
        createdByUserId: true,
        updatedByUserId: true,
      };

      const existingTemplate = await this.client.emailNoticeTemplate.findFirst({
        where: {
          companyId,
          type: type as TemplateType,
          shelfId: shelfId ?? null,
        },
      });

      if (existingTemplate) {
        return await this.client.emailNoticeTemplate.update({
          where: {id: existingTemplate.id},
          data: {
            subject,
            body,
            variables,
            useShelfNotice,
            updatedByUserId: createdByUserId,
            updatedAt: new Date().toISOString(),
          },
          select,
        });
      }

      return await this.client.emailNoticeTemplate.create({
        data: {
          companyId,
          shelfId,
          type: type as TemplateType,
          subject,
          body,
          variables,
          useShelfNotice,
          createdByUserId,
          createdAt: new Date().toISOString(),
        },
        select,
      });
    } catch (error) {
      throw error;
    }
  }

  async getEmailNoticeTemplate(
    companyId: string,
    shelfId?: string | null,
    type: TemplateType = TemplateType.AGENDA_NOTICE,
  ): Promise<EmailNoticeTemplate | null> {
    if (companyId && shelfId !== null) {
      return await this.client.emailNoticeTemplate.findFirst({
        where: {
          companyId,
          type,
          shelfId,
        },
      });
    }

    return await this.client.emailNoticeTemplate.findFirst({
      where: {
        companyId,
        type,
        shelfId: null,
      },
    });
  }

  async sendAgendaNotice(
    agendaId: string,
    companyId: string,
    shelfId: string | null,
    sentByUserId: string,
  ): Promise<void> {
    const template = await this.getEmailNoticeTemplate(companyId, shelfId);
    if (!template) {
      throw new BadRequestError('No template found');
    }

    const agenda = await this.client.agenda.findUnique({
      where: {id: agendaId},
      select: {
        name: true,
        startTime: true,
        location: true,
        meetingDate: true,
        bookshelf: {
          select: {
            name: true,
            bookcase: {
              select: {
                name: true,
                company: true,
              },
            },
          },
        },
        agendaAttendees: {
          select: {
            user: true,
          },
        },
      },
    });

    if (!agenda) {
      throw new BadRequestError('Agenda not found');
    }

    const sender = await this.client.user.findUnique({
      where: {id: sentByUserId},
      select: {
        firstName: true,
        lastName: true,
      },
    });

    if (!sender) {
      throw new BadRequestError('Sender not found');
    }

    const senderName = `${sender.firstName} ${sender.lastName}`.trim();
    const companyName = agenda.bookshelf?.bookcase?.company?.name ?? '';
    const agendaName = agenda.name ?? '';
    const startTime = agenda.startTime ?? 'TBD';
    const location = agenda.location ?? 'TBD';
    const bookcaseName = agenda.bookshelf?.bookcase?.name ?? '';
    const bookshelfName = agenda.bookshelf?.name ?? '';
    const meetingDate = formatDateTime(agenda.meetingDate);

    const attendees = agenda.agendaAttendees;
    for (const attendee of attendees) {
      const user = attendee.user;
      const attendeeName = `${user.firstName} ${user.lastName}`.trim();

      const baseTemplateModel = {
        product_name: productName,
        current_year: currentYear,
        subject: template.subject,
      };

      const templateModel: {[key: string]: string} = {
        attendee_name: attendeeName,
        meeting_title: agendaName,
        meeting_date: meetingDate,
        meeting_time: startTime,
        meeting_location: location,
        sender_name: senderName,
        bookcase_name: bookcaseName,
        bookshelf_name: bookshelfName,
        company_name: companyName,
      };

      for (const variable of template.variables) {
        if (!(variable in templateModel)) {
          templateModel[variable] = '';
        }
      }

      let processedHtml = template.body;
      for (const [key, value] of Object.entries(templateModel)) {
        const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
        processedHtml = processedHtml.replace(regex, value);
      }

      try {
        await sendSingleEmail(user.email, 39740013, {
          ...baseTemplateModel,
          email_body: processedHtml,
        });
      } catch (error: any) {
        throw error;
      }
    }
  }

  async sendPreviewEmail(
    companyId: string,
    shelfId: string | null,
    type: TemplateType = TemplateType.AGENDA_NOTICE,
    email: string,
  ): Promise<{success: boolean; message: string}> {
    const template = await this.getEmailNoticeTemplate(
      companyId,
      shelfId,
      type,
    );
    if (!template) {
      throw new BadRequestError('No template found');
    }

    const subject = template.subject;
    const body = template.body;

    const baseTemplateModel = {
      product_name: productName,
      current_year: currentYear,
    };

    const templateModel: {[key: string]: string} = {
      email_body: body,
      subject: subject,
    };

    try {
      await sendSingleEmail(email, 39740013, {
        ...baseTemplateModel,
        ...templateModel,
      });

      return {
        success: true,
        message: 'Preview email sent successfully',
      };
    } catch (error: any) {
      throw error;
    }
  }

  private extractVariables(body: string): string[] {
    const matches = body.match(/{{[a-zA-Z_]+}}/g) || [];
    return Array.from(new Set(matches.map((v) => v.slice(2, -2))));
  }
}
