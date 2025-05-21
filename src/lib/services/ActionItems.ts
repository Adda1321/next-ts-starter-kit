import BaseService from '@/src/lib/services/BaseService';
import { ActionItem, ActionItemStatus, Prisma, PrismaClient } from '@prisma/client';
import { AppPermissions, ResourceType } from './enums';
import Users from './Users';
import { Context } from '@/graphql/v1';
import { sendSingleEmail } from '@/src/lib/email-sender/sendSingleEmail';
import { templates, productName, currentYear } from '@/src/lib/email-sender/constants';
import { formatDateTime } from '@/src/lib/helpers/formatDateTime';
import { NotFoundError, UnauthorizedError } from '@/src/errors';
import { errorMessages } from '@/constants';

interface SendNewAssigneeEmailsInput {
  newAssigneeIds: string[];
  newExternalAssignees: ExternalAssignee[];
  actionItem: ActionItemFromDB;
  senderName: string;
  organizationName: string;
}

interface SendNewAssigneeEmailsResults {
  total: number;
  sent: number;
  failed: number;
  errors: string[];
}


interface ExternalAssignee {
  email?: string;
  name: string;
  assignedByUserId?: string;
  updatedAt?: string;
};

interface ActionItemInput {
  agendaMinuteId: string;
  actionItem: string;
  assigneeIds?: string[];
  externalAssignees?: ExternalAssignee[];
  dueDate?: Date;
  status?: ActionItemStatus;
  update?: string;
  createdByUserId: string;
  updatedByUserId: string;
};

interface ActionItemFromDB {
  id: string;
  agendaMinuteId: string;
  agendaMinute: {
    agenda: {
      name: string;
    };
  };
  actionItem: string;
  dueDate: Date | null;
  status: ActionItemStatus;
  update: string;
  createdAt: Date;
  updatedAt: Date;
  externalAssignees: ExternalAssignee[];
  assignees: {
    assignees: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    };
  }[];
};

export default class ActionItems extends BaseService {
  constructor(client: PrismaClient) {
    super(client);
  }

  async updateGuestActionItem(
    id: string,
    {
      update,
      status,
      email,
    }: { update: string; status: ActionItemStatus; email: string },
  ) {
    const actionItem = await this.getGuestActionItem(id, email);

    if (!actionItem) {
      return false;
    }

    await this.client.actionItem.update({
      where: { id },
      data: {
        status,
        update,
        updatedAt: new Date(),
      },
    });

    return true;
  }

  async getGuestActionItem(id: string, email: string) {
    const baseQuery = {
      include: {
        assignees: {
          include: {
            assignees: true,
          },
        },
        agendaMinute: {
          include: {
            agenda: {
              select: {
                name: true,
                meetingDate: true,
                bookshelf: {
                  select: {
                    name: true,
                    bookcase: {
                      select: {
                        name: true,
                        company: {
                          select: {
                            name: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    const actionItem = await this.client.actionItem.findUnique({
      where: {
        id,
        deleted: false,
      },
      ...baseQuery,
    });

    if (!actionItem) {
      return null;
    }

    const { isAuthorized, matchingAssignee } = await this.isEmailAuthorized(
      actionItem,
      email,
    );

    if (!isAuthorized || !matchingAssignee) {
      return null;
    }

    const assignedByUserId = matchingAssignee?.assignedByUserId;
    const assignedDate = matchingAssignee?.updatedAt;

    const user = new Users(this.client);
    const assignedBy = await user.getUser(assignedByUserId!);

    return {
      id: actionItem.id,
      actionItem: actionItem.actionItem,
      status: actionItem.status,
      dueDate: actionItem.dueDate,
      organization:
        actionItem?.agendaMinute?.agenda?.bookshelf?.bookcase?.company?.name,
      bookcase: actionItem?.agendaMinute?.agenda?.bookshelf?.bookcase?.name,
      bookshelf: actionItem?.agendaMinute?.agenda?.bookshelf?.name,
      meeting: actionItem?.agendaMinute?.agenda?.name,
      meetingDate: actionItem?.agendaMinute?.agenda?.meetingDate,
      update: actionItem.update
        ? {
          date: actionItem.updatedAt,
          content: actionItem.update,
        }
        : null,
      assignee: matchingAssignee,
      forwardedBy: {
        name: `${assignedBy?.firstName} ${assignedBy?.lastName}`,
        email: assignedBy?.email,
        date: assignedDate,
      },
    };
  }

  async getActionItemsByUserId(userId: string, companyId: string) {
    const accessibleBookshelves = await this.getUserAccessibleBookshelves(
      userId,
      companyId,
    );

    const baseQuery = {
      deleted: false,
      agendaMinute: {
        agenda: {
          bookshelf: {
            bookcase: {
              companyId: companyId,
            },
          },
        },
      },
    };

    // Combine both conditions: MM role access AND assigned items
    const whereClause = {
      OR: [
        // Items where user is an assignee
        {
          ...baseQuery,
          assignees: {
            some: {
              assigneeId: userId,
            },
          },
        },
        // Items from accessible bookshelves (if user has MM role)
        ...(accessibleBookshelves
          ? [
            {
              ...baseQuery,
              agendaMinute: {
                ...baseQuery.agendaMinute,
                agenda: {
                  ...baseQuery.agendaMinute.agenda,
                  bookshelf: {
                    ...baseQuery.agendaMinute.agenda.bookshelf,
                    id: {
                      in: accessibleBookshelves.map((b) => b.id),
                    },
                  },
                },
              },
            },
          ]
          : []),
      ],
    };

    const items = await this.client.actionItem.findMany({
      where: whereClause,
      include: {
        assignees: {
          include: {
            assignees: true,
          },
        },
        agendaMinute: {
          include: {
            agenda: {
              select: {
                id: true,
                name: true,
                bookshelf: {
                  select: {
                    id: true,
                    name: true,
                    bookcase: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
    });

    return items.map((item) => ({
      ...item,
      agendaId: item.agendaMinute.agenda.id,
      externalAssignees: this.transformExternalAssignees(
        item.externalAssignees,
      ),
    }));
  }

  async getActionItemsByAgendaMinuteId(agendaMinuteId: string) {
    const actionItems = await this.client.actionItem.findMany({
      where: {
        agendaMinuteId,
        deleted: false,
      },
      orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
      select: {
        id: true,
        agendaMinuteId: true,
        actionItem: true,
        dueDate: true,
        status: true,
        update: true,
        createdAt: true,
        updatedAt: true,
        externalAssignees: true,
        assignees: {
          include: {
            assignees: true,
          },
        },
        agendaMinute: {
          include: {
            agenda: {
              select: {
                id: true,
                name: true,
                bookshelf: {
                  select: {
                    id: true,
                    name: true,
                    bookcase: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    // Transform externalAssignees from complex objects to simple strings
    return actionItems.map((item) => ({
      ...item,
      externalAssignees: this.transformExternalAssignees(
        item.externalAssignees,
      ),
    }));
  }

  async getActionItem(id: string) {
    return this.client.actionItem.findUnique({
      where: {
        id,
        deleted: false,
      },
      include: {
        assignees: {
          include: {
            assignees: true,
          },
        },
        agendaMinute: {
          include: {
            agenda: {
              select: {
                name: true,
                bookshelf: {
                  select: {
                    name: true,
                    bookcase: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async upsertActionItem(
    id: string | undefined,
    input: ActionItemInput,
    context: Context,
  ): Promise<ActionItemFromDB> {
    const { serviceLocator, userId } = context;
    const { usersService } = serviceLocator;
    const { companyId } = context;

    if (!companyId) throw new UnauthorizedError(errorMessages.missingRequiredFields(['companyId']));
    if (!userId) throw new UnauthorizedError(errorMessages.userNotFound);

    const user = (await usersService.getUserWithCompany({ userId }, companyId));
    if (!user) throw new UnauthorizedError(errorMessages.userNotFound);
    const { user: loggedInUser, company: { name: organizationName } } = user;
    const senderName = `${loggedInUser.firstName} ${loggedInUser.lastName}`;

    const transformedExternalAssignees = (input.externalAssignees || []).map(
      (assignee) => ({
        name: assignee.name || '',
        email: assignee.email || '',
        assignedByUserId: input.updatedByUserId,
        updatedAt: new Date().toISOString(),
      })
    );

    const data = {
      agendaMinuteId: input.agendaMinuteId,
      actionItem: input.actionItem,
      dueDate: input.dueDate,
      status: input.status || 'OPEN',
      update: input.update || '',
    };

    const selectFields = {
      id: true,
      agendaMinuteId: true,
      actionItem: true,
      dueDate: true,
      status: true,
      update: true,
      createdAt: true,
      updatedAt: true,
      externalAssignees: true,
      assignees: {
        include: {
          assignees: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    };

    if (id) {
      return this.client.$transaction(async (tx) => {
        const existingActionItem = await tx.actionItem.findUnique({
          where: { id },
          select: {
            assignees: { select: { assigneeId: true } },
            externalAssignees: true,
          },
        });

        const existingAssigneeIds = new Set(
          existingActionItem?.assignees.map((a) => a.assigneeId) || []
        );

        let existingExternalAssignees: ExternalAssignee[] = [];
        if (existingActionItem?.externalAssignees) {
          const parsedExternal =
            typeof existingActionItem.externalAssignees === 'string'
              ? JSON.parse(existingActionItem.externalAssignees) || []
              : existingActionItem.externalAssignees || [];

          if (Array.isArray(parsedExternal)) {
            existingExternalAssignees = parsedExternal.map((externalAssignee) => ({
              name: externalAssignee.name ?? '',
              email: externalAssignee.email ?? '',
              assignedByUserId: externalAssignee.assignedByUserId ?? input.updatedByUserId,
              updatedAt: externalAssignee.updatedAt ?? new Date().toISOString(),
            }));
          }
        }

        const existingByName = new Map<string, ExternalAssignee>();
        existingExternalAssignees.forEach((ea) => {
          if (ea.name?.trim()) {
            existingByName.set(ea.name.toLowerCase(), ea);
          }
        });

        const finalExternalAssignees =
          input.externalAssignees !== undefined
            ? transformedExternalAssignees.map((newAssignee) => {
              const existingAssignee = existingByName.get(newAssignee.name.toLowerCase());
              if (existingAssignee) {
                return {
                  name: newAssignee.name,
                  email: newAssignee.email?.trim() || existingAssignee.email,
                  assignedByUserId:
                    newAssignee.assignedByUserId ||
                    existingAssignee.assignedByUserId ||
                    input.updatedByUserId,
                  updatedAt:
                    (newAssignee.email?.trim() && newAssignee.email !== existingAssignee.email) ||
                      newAssignee.assignedByUserId !== existingAssignee.assignedByUserId
                      ? new Date().toISOString()
                      : existingAssignee.updatedAt,
                };
              }
              return newAssignee;
            })
            : existingExternalAssignees;

        const newAssigneeIds = (input.assigneeIds || []).filter(
          (assigneeId) => !existingAssigneeIds.has(assigneeId)
        );

        const newExternalAssignees = finalExternalAssignees.filter(
          (newAssignee) => !existingByName.has(newAssignee.name.toLowerCase())
        );

        const assigneesData =
          input.assigneeIds !== undefined
            ? {
              deleteMany: {},
              create: (input.assigneeIds || []).map((assigneeId) => ({ assigneeId })),
            }
            : undefined;

        const actionItem = await tx.actionItem.update({
          where: { id },
          data: {
            ...data,
            updatedByUserId: input.updatedByUserId,
            assignees: assigneesData,
            externalAssignees: JSON.stringify(finalExternalAssignees),
          },
          select: selectFields,
        }) as any;

        const result: ActionItemFromDB = {
          ...actionItem,
          externalAssignees: actionItem.externalAssignees
            ? serviceLocator.actionItemsService.transformExternalAssignees(JSON.parse(actionItem.externalAssignees as string))
            : [],
        };

        await this.sendNewAssigneeEmails(
          {
            newAssigneeIds,
            newExternalAssignees,
            actionItem: result,
            senderName,
            organizationName,
          },
          context,
        );

        return result;
      });
    }

    const actionItem = await this.client.actionItem.create({
      data: {
        ...data,
        createdByUserId: input.createdByUserId,
        updatedByUserId: input.updatedByUserId,
        assignees: input.assigneeIds?.length
          ? {
            create: input.assigneeIds.map((assigneeId) => ({ assigneeId })),
          }
          : undefined,
        externalAssignees: JSON.stringify(transformedExternalAssignees || []),
      },
      select: selectFields,
    }) as any;

    const result: ActionItemFromDB = {
      ...actionItem,
      externalAssignees: actionItem.externalAssignees
        ? serviceLocator.actionItemsService.transformExternalAssignees(JSON.parse(actionItem.externalAssignees as string))
        : [],
    };

    await this.sendNewAssigneeEmails(
      {
        newAssigneeIds: input.assigneeIds || [],
        newExternalAssignees: transformedExternalAssignees,
        actionItem: result,
        senderName,
        organizationName,
      },
      context,
    );

    return result;
  }


  async sendNewAssigneeEmails(
    input: SendNewAssigneeEmailsInput,
    { serviceLocator, origin }: Context,
  ): Promise<SendNewAssigneeEmailsResults> {
    const { newAssigneeIds, newExternalAssignees, actionItem, senderName, organizationName } = input;
    const { usersService } = serviceLocator;
    const results: SendNewAssigneeEmailsResults = { total: 0, sent: 0, failed: 0, errors: [] };

    const baseEmailTemplate = {
      product_name: productName,
      sender_name: senderName,
      organization_name: organizationName,
      meeting_name: actionItem.agendaMinute?.agenda?.name || '',
      current_year: currentYear,
      action_item_description: actionItem.actionItem,
      due_date: formatDateTime(actionItem.dueDate || null) || 'Not Set',
    };

    // Send emails to internal assignees
    await Promise.all(
      newAssigneeIds.map(async (assigneeId) => {
        results.total++;
        try {
          const assignee = actionItem.assignees.find((a) => a.assignees.id === assigneeId)?.assignees;
          if (!assignee?.email) {
            results.failed++;
            results.errors.push(`No email found for internal assignee ${assigneeId}`);
            return;
          }

          const user = await usersService.getUser(assigneeId);
          const memberActionItemLink = `${origin}/actions`;
          await sendSingleEmail(
            assignee.email,
            templates.NonMemberActionItemAssignment,
            {
              invite_sender_name: `${user?.firstName} ${user?.lastName}`,
              action_item_url: memberActionItemLink,
              ...baseEmailTemplate,
            },
          );
          results.sent++;
        } catch (error: any) {
          results.failed++;
          results.errors.push(`Failed to send to internal assignee ${assigneeId}: ${error.message || 'Unknown error'}`);
        }
      }),
    );

    // Send emails to external assignees
    await Promise.all(
      newExternalAssignees.map(async (externalAssignee) => {
        if (!externalAssignee.email) {
          results.total++;
          results.failed++;
          results.errors.push(`No email found for external assignee ${externalAssignee.name}`);
          return;
        }

        results.total++;
        try {
          const user = await usersService.getUser(externalAssignee.assignedByUserId ?? '');
          const nonMemberActionItemLink = `${origin}/action-item/${externalAssignee.email}/${actionItem.id}`;
          await sendSingleEmail(
            externalAssignee.email,
            templates.NonMemberActionItemAssignment,
            {
              invite_sender_name: `${user?.firstName} ${user?.lastName}`,
              action_item_url: nonMemberActionItemLink,
              ...baseEmailTemplate,
            },
          );
          results.sent++;
        } catch (error: any) {
          results.failed++;
          results.errors.push(`Failed to send to ${externalAssignee.email}: ${error.message || 'Unknown error'}`);
        }
      }),
    );

    return results;
  }

  async deleteActionItem(id: string) {
    await this.client.actionItem.update({
      where: { id },
      data: {
        deleted: true,
      },
    });

    return true;
  }

  async addAssignee(actionItemId: string, assigneeId: string) {
    const existingAssignee = await this.client.actionItemAssignee.findFirst({
      where: {
        actionItemId,
        assigneeId,
      },
    });

    if (!existingAssignee) {
      return this.client.actionItemAssignee.create({
        data: {
          actionItemId,
          assigneeId,
          createdAt: new Date().toISOString(),
        },
      });
    }

    return existingAssignee;
  }

  async addExternalAssignee(
    actionItemId: string,
    externalAssignee: {
      name: string;
      email: string;
      assignedByUserId: string;
      updatedAt: string;
    },
  ) {
    const actionItem = await this.client.actionItem.findUnique({
      where: {
        id: actionItemId,
        deleted: false,
      },
      select: {
        externalAssignees: true,
      },
    });

    if (!actionItem) {
      throw new Error('Action item not found');
    }

    let existingAssignees: {
      name: string;
      email: string;
      assignedByUserId: string;
      updatedAt: string;
    }[] = [];

    try {
      if (typeof actionItem.externalAssignees === 'string') {
        existingAssignees = JSON.parse(actionItem.externalAssignees);
      } else if (Array.isArray(actionItem.externalAssignees)) {
        existingAssignees = actionItem.externalAssignees.map((assignee) => {
          if (typeof assignee === 'string') {
            try {
              const parsedAssignee = JSON.parse(assignee) as {
                name?: string;
                email?: string;
                assignedByUserId?: string;
                updatedAt?: string;
              };
              return {
                name: parsedAssignee.name || '',
                email: parsedAssignee.email || '',
                assignedByUserId:
                  parsedAssignee.assignedByUserId ||
                  externalAssignee.assignedByUserId,
                updatedAt:
                  parsedAssignee.updatedAt || externalAssignee.updatedAt,
              };
            } catch {
              return {
                name: assignee,
                email: '',
                assignedByUserId: externalAssignee.assignedByUserId,
                updatedAt: externalAssignee.updatedAt,
              };
            }
          } else if (typeof assignee === 'object' && assignee !== null) {
            const att = assignee as {
              name?: string;
              email?: string;
              assignedByUserId?: string;
              date?: string;
            };
            return {
              name: att.name || '',
              email: att.email || '',
              assignedByUserId:
                att.assignedByUserId || externalAssignee.assignedByUserId,
              updatedAt: att.date || externalAssignee.updatedAt,
            };
          }
          return {
            name: '',
            email: '',
            assignedByUserId: externalAssignee.assignedByUserId,
            updatedAt: externalAssignee.updatedAt,
          };
        });
      }
    } catch (error) {
      existingAssignees = [];
    }
    let existingIndex = -1;

    if (externalAssignee.email && externalAssignee.email.trim() !== '') {
      existingIndex = existingAssignees.findIndex(
        (existing) => existing.email === externalAssignee.email
      );
    } else {
      existingIndex = existingAssignees.findIndex(
        (existing) => existing.name === externalAssignee.name && (!existing.email || existing.email.trim() === '')
      );
    }

    if (existingIndex >= 0) {
      existingAssignees[existingIndex] = {
        ...existingAssignees[existingIndex],
        ...externalAssignee,
        updatedAt: new Date().toISOString()
      };
    } else {
      existingAssignees.push(externalAssignee);
    }

    return this.client.actionItem.update({
      where: { id: actionItemId },
      data: {
        externalAssignees: JSON.stringify(existingAssignees),
      },
      select: {
        id: true,
        externalAssignees: true,
      },
    });
  }



  public transformExternalAssignees(assignees: any): ExternalAssignee[] {
    if (!assignees) return [];
    const createExternalAssignee = (item: any): ExternalAssignee => ({
      name: item?.name || '',
      email: item?.email || '',
      assignedByUserId: item?.assignedByUserId || '',
      updatedAt: item?.updatedAt || new Date().toISOString(),
    });

    const toExternalAssignee = (item: any): ExternalAssignee => {
      if (typeof item === 'string') {
        try {
          const parsed = JSON.parse(item);
          if (typeof parsed === 'object' && parsed !== null) {
            return createExternalAssignee(parsed);
          }
        } catch {
          return createExternalAssignee({ name: item });
        }
      }
      return createExternalAssignee(item);
    };

    try {
      if (Array.isArray(assignees)) {
        return assignees.map(toExternalAssignee);
      }
      if (typeof assignees === 'string') {
        const parsed = JSON.parse(assignees);
        if (!Array.isArray(parsed)) {
          return parsed && parsed.name ? [toExternalAssignee(parsed)] : [];
        }
        return parsed.map(toExternalAssignee);
      }
      return [];
    } catch (error) {
      console.error('Error transforming external assignees:', error);
      return [];
    }
  }

  private async getUserAccessibleBookshelves(
    userId: string,
    companyId: string,
  ) {
    const userRoles = await this.client.rolesOnUsers.findMany({
      where: {
        userId,
        companyId,
        role: {
          key: 'MM',
          isActive: true,
          isDeleted: false,
        },
      },
    });

    const hasMmRole = userRoles.length > 0;

    if (hasMmRole) {
      // Get all bookshelves where user has minute:write permission through CompanyUserResourcePermission
      const permissions =
        await this.client.companyUserResourcePermission.findMany({
          where: {
            userId,
            companyId,
            permissionId: AppPermissions.minutesWrite,
            resourceType: ResourceType.bookshelf,
            hasPermission: true,
            isActive: true,
          },
          select: {
            resourceId: true,
          },
        });

      // Get the bookshelves that match these permissions
      return this.client.bookshelf.findMany({
        where: {
          id: {
            in: permissions.map((p) => p.resourceId),
          },
          bookcase: {
            companyId,
          },
          deleted: false,
        },
        select: {
          id: true,
        },
      });
    }

    return null;
  }

  private async isEmailAuthorized(actionItem: ActionItem, email: string) {
    if (!actionItem) {
      return {
        isAuthorized: false,
        matchingAssignee: null,
      };
    }

    let externalAssignees: {
      name: string;
      email: string;
      assignedByUserId: string;
      updatedAt: string;
    }[] = [];

    try {
      if (typeof actionItem.externalAssignees === 'string') {
        externalAssignees = JSON.parse(actionItem.externalAssignees);
      } else if (Array.isArray(actionItem.externalAssignees)) {
        externalAssignees = actionItem.externalAssignees.map((assignee) =>
          typeof assignee === 'string' ? JSON.parse(assignee) : assignee,
        );
      }
    } catch (error) {
      console.error('Error parsing external assignees:', error);
      return {
        isAuthorized: false,
        matchingAssignee: null,
      };
    }

    const decodedEmail = decodeURIComponent(email);

    const normalizedInputEmail = decodedEmail.toLowerCase().trim();

    const matchingAssignee = externalAssignees.find(
      (assignee) =>
        assignee.email.toLowerCase().trim() === normalizedInputEmail,
    );

    return {
      isAuthorized: !!matchingAssignee,
      matchingAssignee,
    };
  }

  async getActionLogsForBookshelf(bookshelfId: string) {
    const agendasWithActionItems = await this.client.agenda.findMany({
      where: {
        bookshelfId,
        deleted: false,
        archived: false,
        agendaMinute: {
          actionItems: {
            some: { deleted: false },
          },
        },
      },
      select: {
        id: true,
        name: true,
        meetingDate: true,
        agendaMinute: {
          select: {
            id: true,
            actionItems: {
              where: {
                deleted: false,
              },
              select: {
                id: true,
                actionItem: true,
                status: true,
                agendaMinuteId: true,
                carryOverCount: true,
              },
            },
          },
        },
      },
      orderBy: {
        meetingDate: 'asc',
      },
    });

    const actionLogs = agendasWithActionItems.map((agenda) => {
      const filteredActionItems = agenda.agendaMinute?.actionItems.filter(
        (item) =>
          item.status === ActionItemStatus.OPEN ||
          (item.status === ActionItemStatus.CLOSED &&
            item.carryOverCount === 0),
      );
      return {
        meetingId: agenda.id,
        meetingName: agenda.name,
        meetingDate: agenda.meetingDate,
        actionItems: filteredActionItems || [],
      };
    });

    return actionLogs.filter((log) => log.actionItems.length > 0);
  }

  async getCarryOverActionItems(agendaId: string) {
    const actionLogs = await this.client.actionLog.findMany({
      where: {
        targetAgendaId: agendaId,
        actionItem: {
          deleted: false,
        },
      },
      include: {
        actionItem: {
          include: {
            assignees: {
              include: {
                assignees: {
                  select: { id: true, firstName: true, lastName: true },
                },
              },
            },
            agendaMinute: {
              select: { id: true },
            },
          },
        },
        sourceAgenda: {
          include: {
            bookshelf: {
              include: {
                bookcase: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const actionItems = actionLogs.map((log) => {
      const actionItem = log.actionItem;
      const sourceAgenda = log.sourceAgenda;

      return {
        id: actionItem.id,
        actionItem: actionItem.actionItem,
        assignees: actionItem.assignees,
        externalAssignees: this.transformExternalAssignees(
          actionItem.externalAssignees,
        ),
        dueDate: actionItem.dueDate,
        status: actionItem.status,
        update: actionItem.update || null,
        agendaId: log.targetAgendaId,
        agendaMinuteId:
          actionItem.agendaMinuteId || actionItem.agendaMinute?.id || '',
        createdAt: actionItem.createdAt,
        updatedAt: actionItem.updatedAt || actionItem.createdAt,
        meetingName: sourceAgenda?.name || null,
        bookshelfName: sourceAgenda?.bookshelf?.name || null,
        bookcaseName: sourceAgenda?.bookshelf?.bookcase?.name || null,
      };
    });

    return actionItems;
  }
}
