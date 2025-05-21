import BaseService from '@/src/lib/services/BaseService';
import {Prisma, PrismaClient} from '@prisma/client';
import {BadRequestError, NotFoundError} from '@/src/errors';
import {GroupInput, GroupSelect} from './types/Group';
import ResourcePermission from './types/ResourcePermission';
import GroupResourcePermission from './GroupResourcePermission';
import {ResourceType} from './enums';
import {DefaultArgs} from '@prisma/client/runtime/library';

const USER_SELECT = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
};

const DEFAULT_GROUP_NAME = 'DEFAULT GROUP';
const DEFAULT_GROUP_DESCRIPTION = 'Default group for company users';
const DEFAULT_GROUP_TYPE = 'DEFAULT';

const GROUP_BASE_SELECT = {
  id: true,
  name: true,
  description: true,
  type: true,
  companyId: true,
  isActive: true,
  isSuperGroup: true,
  createdAt: true,
  createdByUserId: true,
  updatedAt: true,
  updatedByUserId: true,
};

const GROUP_RELATIONS_SELECT = {
  users: {
    where: {
      isActive: true,
    },
    select: {
      user: {
        select: USER_SELECT,
      },
    },
  },
  managers: {
    where: {
      isActive: true,
    },
    select: {
      manager: {
        select: USER_SELECT,
      },
    },
  },
};

export default class Groups extends BaseService {
  constructor(client: PrismaClient) {
    super(client);
  }

  private transformGroupData(group: any) {
    return {
      ...group,
      users: group.users?.map((u: any) => u.user) || [],
      managers: group.managers?.map((m: any) => m.manager) || [],
    };
  }

  private async _checkUserRole(
    userId: string,
    companyId: string,
    roleKey: string,
  ): Promise<boolean> {
    const user = await this.client.user.findUnique({
      where: {id: userId},
      select: {
        roles: {
          where: {companyId},
          select: {
            role: {
              select: {key: true},
            },
          },
        },
      },
    });

    const userRoles = user?.roles.map((r) => r.role?.key) || [];
    return userRoles.includes(roleKey);
  }

  async createGroup(input: GroupInput, userId: string) {
    return this.client.$transaction(async (tx) => {
      // Check if user is UA and not GSA
      const isUA = await this._checkUserRole(userId, input.companyId, 'UA');
      const isGSA = await this._checkUserRole(userId, input.companyId, 'GSA');

      const group = await tx.group.create({
        data: {
          name: input.name,
          description: input.description,
          type: input?.type,
          companyId: input.companyId,
          isActive: true,
          isSuperGroup: input.isSuperGroup,
          createdByUserId: userId,
          updatedByUserId: userId,
        },
      });

      // If UA and autoAddCurrentUserAsAdmin is true, add current user to managers
      const finalManagerIds = [...(input.managerIds || [])];
      if (
        isUA &&
        !isGSA &&
        input.autoAddCurrentUserAsAdmin &&
        !finalManagerIds.includes(userId)
      ) {
        finalManagerIds.push(userId);
      }

      if (finalManagerIds.length) {
        await tx.groupManagers.createMany({
          data: finalManagerIds.map((managerId) => ({
            managerId,
            groupId: group.id,
            createdByUserId: userId,
            updatedByUserId: userId,
          })),
        });
      }

      if (input.userIds?.length) {
        await tx.usersInGroups.createMany({
          data: input.userIds.map((userId) => ({
            userId,
            groupId: group.id,
            createdByUserId: userId,
            updatedByUserId: userId,
          })),
        });
      }

      await this._assignUserAdminRoleToManagers(
        input.managerIds,
        input.companyId,
        userId,
      );

      return this.transformGroupData(group);
    });
  }

  async updateGroup(
    id: string,
    input: Partial<GroupInput>,
    userId: string,
    select: GroupSelect = {},
  ) {
    const existingGroup = await this.client.group.findUnique({
      where: {id},
      select: {
        ...GROUP_BASE_SELECT,
        users: {
          select: {userId: true},
        },
        managers: {
          select: {managerId: true},
        },
      },
    });

    if (!existingGroup) {
      throw new BadRequestError('Group not found');
    }

    const updatedAt = new Date().toISOString();

    return this.client.$transaction(async (tx) => {
      const updateData: any = {
        updatedAt,
        updatedByUserId: userId,
        ...(input.name && {name: input.name}),
        ...(input.description !== undefined && {
          description: input.description,
        }),
        ...(input?.type && {type: input.type}),
        ...(input.companyId && {companyId: input.companyId}),
        ...(input.isSuperGroup !== undefined && {
          isSuperGroup: input.isSuperGroup,
        }),
      };

      if (input.userIds) {
        const existingUserIds = new Set(
          existingGroup.users.map((u) => u.userId),
        );
        const newUserIds = new Set(input.userIds);

        const usersToAdd = input.userIds.filter(
          (id) => !existingUserIds.has(id),
        );

        const usersToDeactivate = Array.from(existingUserIds).filter(
          (id) => !newUserIds.has(id),
        );

        const usersToReactivate = input.userIds.filter((id) =>
          existingUserIds.has(id),
        );

        updateData.users = {
          updateMany: [
            {
              where: {
                groupId: existingGroup.id,
                userId: {in: usersToDeactivate},
              },
              data: {
                isActive: false,
                updatedAt,
                updatedByUserId: userId,
              },
            },
            {
              where: {
                groupId: existingGroup.id,
                userId: {in: usersToReactivate},
              },
              data: {
                isActive: true,
                updatedAt,
                updatedByUserId: userId,
              },
            },
          ],
          create: usersToAdd.map((userId) => ({
            userId,
            isActive: true,
            createdAt: updatedAt,
            updatedAt,
            createdByUserId: userId,
            updatedByUserId: userId,
          })),
        };
      }

      if (input.managerIds) {
        const existingManagerIds = new Set(
          existingGroup.managers.map((m) => m.managerId),
        );
        const newManagerIds = new Set(input.managerIds);

        const managersToAdd = input.managerIds.filter(
          (id) => !existingManagerIds.has(id),
        );

        const managersToDeactivate = Array.from(existingManagerIds).filter(
          (id) => !newManagerIds.has(id),
        );

        const managersToReactivate = input.managerIds.filter((id) =>
          existingManagerIds.has(id),
        );

        updateData.managers = {
          updateMany: [
            {
              where: {
                groupId: existingGroup.id,
                managerId: {in: managersToDeactivate},
              },
              data: {
                isActive: false,
                updatedAt,
                updatedByUserId: userId,
              },
            },
            {
              where: {
                groupId: existingGroup.id,
                managerId: {in: managersToReactivate},
              },
              data: {
                isActive: true,
                updatedAt,
                updatedByUserId: userId,
              },
            },
          ],
          create: managersToAdd.map((managerId) => ({
            managerId,
            isActive: true,
            createdAt: updatedAt,
            updatedAt,
            createdByUserId: userId,
            updatedByUserId: userId,
          })),
        };
      }

      const group = await tx.group.update({
        where: {id},
        data: updateData,
        select: {
          ...GROUP_BASE_SELECT,
          ...GROUP_RELATIONS_SELECT,
          ...select,
        },
      });

      await this._assignUserAdminRoleToManagers(
        input?.managerIds || [],
        existingGroup.companyId,
        userId,
      );

      return this.transformGroupData(group);
    });
  }

  async deleteGroup(id: string, userId: string) {
    const existingGroup = await this.client.group.findUnique({
      where: {id},
      select: {
        ...GROUP_BASE_SELECT,
        ...GROUP_RELATIONS_SELECT,
      },
    });

    if (!existingGroup) {
      throw new BadRequestError('Group not found');
    }

    const updatedAt = new Date().toISOString();

    await this.client.group.update({
      where: {id},
      data: {
        isActive: false,
        updatedAt,
        updatedByUserId: userId,
      },
    });

    return {
      ...this.transformGroupData(existingGroup),
      isActive: false,
      updatedAt,
      updatedByUserId: userId,
    };
  }

  async getGroups(companyId: string, userId: string) {
    const isGSA = await this._checkUserRole(userId, companyId, 'GSA');

    const groups = await this.client.group.findMany({
      where: {
        companyId,
        isActive: true,
        ...(isGSA
          ? {}
          : {
              OR: [
                {
                  managers: {
                    some: {
                      managerId: userId,
                      isActive: true,
                    },
                  },
                },
                {
                  users: {
                    some: {
                      userId,
                      isActive: true,
                    },
                  },
                },
              ],
            }),
      },
      select: {
        ...GROUP_BASE_SELECT,
        ...GROUP_RELATIONS_SELECT,
      },
    });

    return groups.map(this.transformGroupData);
  }

  async getUserGroups(companyId: string, userId: string) {
    return this.client.group.findMany({
      where: {
        companyId,
        isActive: true,
        managers: {
          some: {
            managerId: userId,
          },
        },
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async getGroup(id: string, select?: GroupSelect) {
    if (!id) {
      throw new BadRequestError('Group ID is required');
    }

    const group = await this.client.group.findUnique({
      where: {
        id,
        isActive: true,
      },
      select: {
        ...GROUP_BASE_SELECT,
        ...GROUP_RELATIONS_SELECT,
        ...select,
      },
    });

    if (!group) {
      throw new NotFoundError('Group not found');
    }

    return this.transformGroupData(group);
  }

  private async _isGroupCreator(
    groupId: string,
    userId: string,
  ): Promise<boolean> {
    const group = await this.client.group.findUnique({
      where: {
        id: groupId,
        isActive: true,
      },
      select: {
        createdByUserId: true,
      },
    });

    return group?.createdByUserId === userId;
  }

  async getGroupBookcases(userId: string, args: any = {}) {
    const {groupId, companyId} = args;

    const group = await this.getGroup(groupId);

    if (!group) {
      throw new NotFoundError('Group not found');
    }

    const isGSA = await this._checkUserRole(userId, companyId, 'GSA');
    // Only check for group creator if not GSA
    const isGroupCreator = !isGSA
      ? await this._isGroupCreator(groupId, userId)
      : false;

    let whereClause: any = {
      companyId: companyId,
      deleted: false,
      ...args.where,
    };

    let bookshelvesWhereClause: any = {
      deleted: false,
    };

    if (!isGSA && isGroupCreator) {
      // For group creators, get bookcases where they are group admin
      const adminGroups = await this.client.group.findMany({
        where: {
          managers: {
            some: {
              managerId: userId,
              isActive: true,
            },
          },
          isActive: true,
        },
        select: {
          id: true,
        },
      });

      const adminGroupIds = adminGroups.map((g) => g.id);

      // Get all resource permissions for groups where user is admin
      const groupResourcePermissions =
        await this.client.groupResourcePermission.findMany({
          where: {
            groupId: {
              in: adminGroupIds,
            },
            isActive: true,
            hasPermission: true,
            resourceType: {
              in: [ResourceType.bookcase, ResourceType.bookshelf],
            },
          },
          select: {
            resourceId: true,
            resourceType: true,
          },
        });

      const permittedBookcaseIds = groupResourcePermissions
        .filter((p) => p.resourceType === ResourceType.bookcase)
        .map((p) => p.resourceId);

      const permittedBookshelfIds = groupResourcePermissions
        .filter((p) => p.resourceType === ResourceType.bookshelf)
        .map((p) => p.resourceId);

      whereClause = {
        ...whereClause,
        OR: [
          {id: {in: permittedBookcaseIds}},
          {
            bookshelves: {
              some: {
                id: {in: permittedBookshelfIds},
              },
            },
          },
        ],
      };

      bookshelvesWhereClause = {
        ...bookshelvesWhereClause,
        OR: [
          {id: {in: permittedBookshelfIds}},
          {bookcaseId: {in: permittedBookcaseIds}},
        ],
      };
    } else if (!isGSA) {
      // For non-GSA and non-creator users, filter based on group permissions
      const groupResourcePermissions =
        await this.client.groupResourcePermission.findMany({
          where: {
            groupId,
            isActive: true,
            hasPermission: true,
            resourceType: {
              in: [ResourceType.bookcase, ResourceType.bookshelf],
            },
          },
          select: {
            resourceId: true,
            resourceType: true,
          },
        });

      const permittedBookcaseIds = groupResourcePermissions
        .filter((p) => p.resourceType === ResourceType.bookcase)
        .map((p) => p.resourceId);

      const permittedBookshelfIds = groupResourcePermissions
        .filter((p) => p.resourceType === ResourceType.bookshelf)
        .map((p) => p.resourceId);

      // If there are no specific permissions, we shouldn't return any bookcases
      if (
        permittedBookcaseIds.length === 0 &&
        permittedBookshelfIds.length === 0
      ) {
        return [];
      }

      whereClause = {
        ...whereClause,
        OR: [
          {id: {in: permittedBookcaseIds}},
          {
            bookshelves: {
              some: {
                id: {in: permittedBookshelfIds},
              },
            },
          },
        ],
      };

      bookshelvesWhereClause = {
        ...bookshelvesWhereClause,
        OR: [
          {id: {in: permittedBookshelfIds}},
          {bookcaseId: {in: permittedBookcaseIds}},
        ],
      };
    }

    return this.client.bookcase.findMany({
      orderBy: args.orderBy || {name: 'asc'},
      where: whereClause,
      include: {
        bookshelves: {
          where: bookshelvesWhereClause,
          orderBy: {
            name: 'asc',
          },
          include: {
            agendas: {
              where: {
                deleted: false,
                archived: false,
              },
              orderBy: {
                meetingDate: 'desc',
              },
              include: {
                agendaMinute: {
                  include: {
                    signatures: true,
                  },
                },
              },
            },
          },
        },
      },
      skip: args.skip || 0,
      take: args.take || 255,
    });
  }

  async getGroupResourcePermissions(groupId: string, userId: string) {
    const group = await this.client.group.findUnique({
      where: {
        id: groupId,
        isActive: true,
      },
      select: {
        id: true,
        companyId: true,
      },
    });

    if (!group) {
      throw new NotFoundError('Group not found');
    }

    return this.client.groupResourcePermission.findMany({
      where: {
        groupId,
        isActive: true,
      },
      select: {
        resourceId: true,
        resourceType: true,
      },
    });
  }

  async updateGroupResourcePermissions(
    groupId: string,
    userId: string,
    resourcePermissions: ResourcePermission[],
  ) {
    const groupResourcePermissionService = new GroupResourcePermission(
      this.client,
    );

    await groupResourcePermissionService.updatePermissions(
      groupId,
      userId,
      resourcePermissions,
    );

    return this.getGroup(groupId);
  }

  async addUserToGroup(
    prisma: Omit<
      PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
      '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
    >,
    userId: string,
    groupId: string,
    createdByUserId: string,
  ) {
    return prisma.usersInGroups.upsert({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
      update: {
        isActive: true,
        updatedByUserId: createdByUserId,
        updatedAt: new Date().toISOString(),
      },
      create: {
        userId,
        groupId,
        createdByUserId,
        updatedByUserId: createdByUserId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
  }

  async findOrCreateDefaultGroup(
    companyId: string,
    userId: string,
  ): Promise<string> {
    const defaultGroup = await this.client.group.findFirst({
      where: {
        name: DEFAULT_GROUP_NAME,
        companyId,
        isActive: true,
      },
      select: {
        id: true,
      },
    });

    if (defaultGroup) {
      return defaultGroup.id;
    }

    const newGroup = await this.client.group.create({
      data: {
        name: DEFAULT_GROUP_NAME,
        description: DEFAULT_GROUP_DESCRIPTION,
        type: DEFAULT_GROUP_TYPE,
        companyId,
        isActive: true,
        isSuperGroup: false,
        createdByUserId: userId,
        updatedByUserId: userId,
      },
      select: {
        id: true,
      },
    });

    return newGroup.id;
  }

  async getUsersInManagedGroups(
    userId: string,
    companyId: string,
    query?: string | null,
    skip?: number | null,
    take?: number | null,
  ) {
    const managedGroups = await this.client.group.findMany({
      where: {
        companyId,
        isActive: true,
        managers: {
          some: {
            managerId: userId,
          },
        },
      },
      include: {
        users: {
          where: {
            user: {
              isActive: true,
              ...(query
                ? {
                    OR: [
                      {email: {contains: query, mode: 'insensitive'}},
                      {firstName: {contains: query, mode: 'insensitive'}},
                      {lastName: {contains: query, mode: 'insensitive'}},
                    ],
                  }
                : {}),
            },
          },
          include: {
            user: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                telephone: true,
                lastSignedIn: true,
                companies: {
                  where: {
                    companyId,
                  },
                  select: {
                    companyId: true,
                    accountStatus: true,
                    lastSignedIn: true,
                    provider: true,
                    isActive: true,
                  },
                },
                roles: {
                  where: {
                    companyId,
                  },
                  select: {
                    role: {
                      select: {
                        id: true,
                        name: true,
                        description: true,
                        key: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
      skip: skip ?? 0,
      take: take ?? 250,
    });

    const users = managedGroups.flatMap((group) =>
      group.users.map((userInGroup) => {
        const user = userInGroup.user;
        const [company] = user.companies;
        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          telephone: user.telephone,
          lastSignedIn: user.lastSignedIn,
          isActive: true,
          accountStatus: company?.accountStatus,
          companies: [
            {
              companyId: company?.companyId,
              accountStatus: company?.accountStatus,
              lastSignedIn: company?.lastSignedIn,
              provider: company?.provider,
            },
          ],
          roles: user.roles.map(({role}) => ({
            ...role,
          })),
        };
      }),
    );

    return Array.from(new Map(users.map((user) => [user.id, user])).values());
  }

  private async _assignUserAdminRoleToManagers(
    managerIds: string[],
    companyId: string,
    createdByUserId: string,
  ) {
    if (!managerIds.length) return;

    const userAdminRole = await this.client.role.findFirst({
      where: {
        key: 'UA',
        isActive: true,
        isDeleted: false,
      },
      select: {
        id: true,
      },
    });

    if (!userAdminRole) return;

    const existingAssignments = await this.client.rolesOnUsers.findMany({
      where: {
        userId: {
          in: managerIds,
        },
        roleId: userAdminRole.id,
        companyId,
        role: {
          isActive: true,
          isDeleted: false,
        },
      },
      select: {
        userId: true,
      },
    });

    const existingUserIds = new Set(
      existingAssignments.map((assignment) => assignment.userId),
    );

    const managersNeedingRole = managerIds.filter(
      (managerId) => !existingUserIds.has(managerId),
    );

    if (!managersNeedingRole.length) return;

    await this.client.rolesOnUsers.createMany({
      data: managersNeedingRole.map((managerId) => ({
        userId: managerId,
        roleId: userAdminRole.id,
        companyId,
        createdByUserId,
      })),
      skipDuplicates: true,
    });
  }
}
