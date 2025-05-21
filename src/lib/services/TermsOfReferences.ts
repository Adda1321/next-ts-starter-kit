import {
  GetTermsOfReferenceOptions,
  TermsOfReference,
} from './types/TermsOfReference';
import {NotFoundError} from '@/src/errors';
import BaseService from './BaseService';
import {PrismaClient, Prisma} from '@prisma/client';
import {BadRequestError, UnauthorizedError} from '@/src/errors';

export default class TermsOfReferences extends BaseService {
  constructor(client: PrismaClient) {
    super(client);
  }

  private get defaultSelect() {
    return {
      id: true,
      shelfId: true,
      meetingDescription: true,
      quorumDecisionMakers: true,
      quorumTotalMembers: true,
      meetingFrequency: true,
      deliverables: true,
      createdAt: true,
      updatedAt: true,
      createdByUserId: true,
      updatedByUserId: true,
      deleted: true,
      shelf: {
        select: {
          id: true,
          name: true,
        },
      },
      members: {
        select: {
          id: true,
          userId: true,
          role: true,
          isDecisionMaker: true,
          user: {
            select: {
              id: true,
              firstName: true,
            },
          },
        },
      },
    };
  }

  private mapper(tor: any): TermsOfReference {
    return {
      id: tor.id,
      shelfId: tor.shelfId,
      meetingDescription: tor.meetingDescription,
      quorumDecisionMakers: tor.quorumDecisionMakers,
      quorumTotalMembers: tor.quorumTotalMembers,
      meetingFrequency: tor.meetingFrequency,
      deliverables: tor.deliverables,
      createdAt: tor.createdAt,
      updatedAt: tor.updatedAt,
      createdByUserId: tor.createdByUserId,
      updatedByUserId: tor.updatedByUserId,
      deleted: tor.deleted,
      shelf: tor.shelf,
      members: tor.members.map((member: any) => ({
        id: member.id,
        userId: member.userId,
        role: member.role,
        isDecisionMaker: member.isDecisionMaker,
        user: member.user,
      })),
    };
  }

  async findByShelf(shelfId: string, options?: GetTermsOfReferenceOptions) {
    const where: Prisma.TermsOfReferenceWhereInput = {
      shelfId,
      deleted: false,
    };

    if (options?.search) {
      where.meetingDescription = {
        contains: options.search,
        mode: 'insensitive',
      };
    }

    const termsOfReferences = await this.client.termsOfReference.findMany({
      where,
      skip: options?.skip,
      take: options?.take,
      orderBy: {
        createdAt: 'asc',
      },
      select: this.defaultSelect,
    });

    return termsOfReferences.map(this.mapper);
  }

  async create(data: any, userId: string) {
    const {shelfId, members} = data;
    let message = '';

    const existingTOR = await this.client.termsOfReference.findFirst({
      where: {shelfId},
      include: {members: true},
    });

    if (existingTOR) {
      await this.updateTermsOfReference(existingTOR.id, data, userId);
      message = 'Terms of Reference updated successfully';
    } else {
      await this.addTermsOfReference(data, userId);
      message = 'Terms of Reference created successfully';
    }

    return message;
  }

  async addTermsOfReference(data: any, userId: string) {
    const {
      shelfId,
      meetingDescription,
      quorumDecisionMakers,
      quorumTotalMembers,
      meetingFrequency,
      deliverables,
      members,
    } = data;

    try {
      const newTOR = await this.client.termsOfReference.create({
        data: {
          shelfId,
          meetingDescription,
          quorumDecisionMakers,
          quorumTotalMembers,
          meetingFrequency,
          deliverables,
          createdByUserId: userId,
          members: {
            create: members.map((member: any) => ({
              userId: member.userId,
              role: member.role,
              isDecisionMaker: member.isDecisionMaker,
              createdByUserId: userId,
            })),
          },
        },
      });

      return newTOR;
    } catch (error) {
      throw new BadRequestError('Failed to create Terms of Reference');
    }
  }

  async updateTermsOfReference(torId: string, data: any, userId: string) {
    const {
      members,
      meetingDescription,
      quorumDecisionMakers,
      quorumTotalMembers,
      meetingFrequency,
      deliverables,
    } = data;

    const existingTOR = await this.client.termsOfReference.findUnique({
      where: {id: torId},
      include: {members: true},
    });

    if (!existingTOR) {
      throw new NotFoundError('Terms of Reference not found.');
    }

    await this.client.termsOfReference.update({
      where: {id: torId},
      data: {
        meetingDescription,
        quorumDecisionMakers,
        quorumTotalMembers,
        meetingFrequency,
        deliverables,
        updatedByUserId: userId,
      },
    });

    for (const newMember of members) {
      const existingMember = existingTOR.members.find(
        (member) => member.userId === newMember.userId,
      );

      if (existingMember) {
        // Update existing member
        await this.client.tORMember.update({
          where: {id: existingMember.id},
          data: {
            role: newMember.role,
            isDecisionMaker: newMember.isDecisionMaker,
            updatedByUserId: userId,
          },
        });
      } else {
        // Add new member
        await this.client.tORMember.create({
          data: {
            termsOfReferenceId: torId,
            userId: newMember.userId,
            role: newMember.role,
            isDecisionMaker: newMember.isDecisionMaker,
            createdByUserId: userId,
          },
        });
      }
    }

    // Remove members not in the updated list
    const updatedUserIds = members.map((member: any) => member.userId);
    const membersToDelete = existingTOR.members.filter(
      (member) => !updatedUserIds.includes(member.userId),
    );

    for (const memberToDelete of membersToDelete) {
      await this.client.tORMember.delete({
        where: {id: memberToDelete.id},
      });
    }
  }
}
