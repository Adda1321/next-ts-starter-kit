import { AccountStatusList, Prisma, PrismaClient } from '@prisma/client';
import BaseService from '@/src/lib/services/BaseService';
import { BadRequestError, NotFoundError } from '@/src/errors';
import { v4 } from 'uuid';
import { errorMessages } from '@/constants';
import { generatePassword } from '@/graphql/v1/helpers/generatePassword';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { DefaultArgs } from '@prisma/client/runtime/library';
import Groups from './Groups';

interface UserFilter {
  userId?: string;
  email?: string;
}

interface NewUserInput {
  email: string;
  firstName: string;
  lastName: string;
  telephone?: string;
  password: string;
  companyId: string;
  provider?: string;
  createdByUserId: string;
  groupId?: string;
  userId?: string;
}

interface UpdateUserInput {
  email: string;
  firstName?: string;
  lastName?: string;
  telephone?: string;
  password?: string;
  companyId?: string;
  createdByUserId?: string;
  provider?: string;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordResetToken: { token: string } | null;
  companies: {
    provider?: string | null;
    accountStatus?: AccountStatusList | null;
    isActive?: boolean | null;
  }[];
  provider?: string | null;
}

export default class Users extends BaseService {
  private groupsService: Groups;

  constructor(client: PrismaClient) {
    super(client);
    this.groupsService = new Groups(client);
  }

  async generateAndHashPassword(
    length: number = 12,
    saltRounds: number = 10,
  ): Promise<string> {
    const generatedPassword = generatePassword(length);
    const hashedPassword = await bcrypt.hash(generatedPassword, saltRounds);
    return hashedPassword;
  }

  generateToken(userId: string): string {
    const { JWT_SECRET, TOKEN_EXPIRATION_TIME } = process.env;

    if (!JWT_SECRET || !TOKEN_EXPIRATION_TIME) {
      throw new BadRequestError(
        errorMessages.missingRequiredFields([
          'JWT_SECRET',
          'TOKEN_EXPIRATION_TIME',
        ]),
      );
    }

    return jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRATION_TIME,
    } as jwt.SignOptions);
  }

  async upsertPasswordResetToken(userId: string, token: string) {
    return await this.client.passwordResetToken.upsert({
      where: { userId },
      create: { userId, token, createdAt: new Date().toISOString() },
      update: { token },
    });
  }

  async getUser(id: string) {
    const user = await this.client.user.findUnique({
      where: {
        id: id,
      },
    });

    if (user) {
      return user;
    }
  }

  async findUserByEmailExcludingId(email: string, userId?: string) {
    try {
      return await this.client.user.findFirst({
        where: {
          email: {
            equals: email,
            mode: 'insensitive',
          },
          ...(userId && {
            id: {
              not: userId,
            },
          }),
        },
      });
    } catch (error) {
      throw new Error(`Failed to find user by email: ${error}`);
    }
  }

  private getAuditFields(createdByUserId: string) {
    return {
      createdByUserId,
      createdAt: new Date().toISOString(),
      updatedByUserId: createdByUserId,
      updatedAt: new Date().toISOString(),
    };
  }

  async userExists(email: string): Promise<User | null> {
    return this.client.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
        isActive: true,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        companies: {
          select: {
            companyId: true,
            accountStatus: true,
            isActive: true,
            provider: true,
          },
        },
        passwordResetToken: {
          select: {
            token: true,
          },
        },
      },
    });
  }

  async findRoleByKey(key: string) {
    try {
      const role = await this.client.role.findUnique({
        where: {
          key: key,
          isActive: true,
          isDeleted: false,
        },
        select: {
          id: true,
        },
      });

      if (!role) {
        throw new NotFoundError(`Role '${key}' not found`);
      }

      return role;
    } catch (error) {
      throw new Error('Failed to find role. Please try again.');
    }
  }
  async findRoleByName(roleName: string) {
    try {
      const role = await this.client.role.findUnique({
        where: {
          name: roleName,
          isActive: true,
          isDeleted: false,
        },
        select: {
          id: true,
        },
      });

      if (!role) {
        throw new NotFoundError(`Role '${roleName}' not found`);
      }

      return role;
    } catch (error) {
      throw new Error('Failed to find role. Please try again.');
    }
  }

  async addUserRole(
    prisma: Omit<
      PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
      '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
    >,
    userId: string,
    roleId: string,
    companyId: string,
    createdByUserId: string,
  ) {
    const auditFields = this.getAuditFields(createdByUserId);
    return await this.client.rolesOnUsers.create({
      data: {
        userId,
        roleId,
        companyId,
        ...auditFields,
      },
    });
  }

  async addUser(user: NewUserInput) {
    const {
      userId,
      email,
      firstName,
      lastName,
      telephone,
      password,
      companyId,
      provider,
      createdByUserId,
      groupId,
    } = user;

    const select = {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      telephone: true,
      lastSignedIn: true,
      companies: {
        select: {
          isActive: true,
          accountStatus: true,
          companyId: true,
          userId: true,
        },
      },
    };

    try {
      let userWithEmail = await this.client.user.findFirst({
        where: {
          email: {
            equals: email,
            mode: 'insensitive',
          },
        },
        select,
      });

      const { id: roleId } = await this.findRoleByKey('R');
      const defaultGroupId = await this.getGroupIdOrDefault(
        groupId,
        companyId,
        createdByUserId,
      );

      const createdUser = await this.client.$transaction(async (prisma) => {
        if (userWithEmail) {
          const { id: userId } = userWithEmail;

          await this.addUserToCompany(
            prisma,
            userId,
            companyId,
            createdByUserId,
            provider,
          );

          await this.addUserRole(
            prisma,
            userId,
            roleId,
            companyId,
            createdByUserId,
          );

          await this.groupsService.addUserToGroup(
            prisma,
            userId,
            defaultGroupId,
            createdByUserId,
          );

          return userWithEmail;
        }

        const auditFields = this.getAuditFields(createdByUserId);

        const newUser = await prisma.user.create({
          data: {
            id: userId || v4(),
            email,
            firstName,
            lastName,
            telephone,
            password: password,
            companies: {
              create: {
                accountStatus: AccountStatusList.PENDING,
                companyId,
                provider,
                ...auditFields,
              },
            },
            roles: {
              create: {
                roleId,
                companyId,
                ...auditFields,
              },
            },
            groups: {
              create: {
                groupId: defaultGroupId,
                ...auditFields,
              },
            },
          },
          select: {
            ...select,
            roles: {
              select: {
                role: {
                  select: {
                    id: true,
                    description: true,
                    name: true,
                  },
                },
              },
            },
          },
        });

        return newUser;
      });

      return createdUser;
    } catch (error) {
      throw new Error(
        (error as Error).message || 'Failed to add user. Please try again.',
      );
    }
  }

  async addUserToCompany(
    prisma: Omit<
      PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
      '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
    >,
    userId: string,
    companyId: string,
    createdByUserId: string,
    provider: string = '',
  ) {
    const auditFields = this.getAuditFields(createdByUserId);
    return await prisma.usersOnCompanies.create({
      data: {
        userId: userId,
        companyId,
        provider,
        accountStatus: AccountStatusList.PENDING,
        ...auditFields,
      },
    });
  }

  async updateUser(userId: string, user: UpdateUserInput) {
    const {
      email,
      firstName,
      lastName,
      telephone,
      companyId,
      provider,
      createdByUserId,
    } = user;
    const auditFields = this.getAuditFields(createdByUserId!);

    try {
      return await this.client.$transaction(async (prisma) => {
        const updatedUser = await prisma.user.update({
          where: {
            id: userId,
            companies: {
              some: {
                companyId,
              },
            },
          },
          data: {
            firstName,
            lastName,
            telephone,
            email,
            ...auditFields,
          },
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            telephone: true,
            lastSignedIn: true,
          },
        });
        await prisma.usersOnCompanies.update({
          where: {
            userId_companyId: {
              userId: updatedUser.id,
              companyId: companyId!,
            },
          },
          data: {
            provider,
            ...auditFields,
          },
        });
        return updatedUser;
      });
    } catch (error) {
      throw error;
    }
  }

  async getUserWithCompany(filter: UserFilter, companyId: string) {
    try {
      return await this.client.usersOnCompanies.findFirst({
        where: {
          companyId,
          ...(filter.userId && { userId: filter.userId }),
          ...(filter.email && {
            user: {
              email: {
                equals: filter.email,
                mode: 'insensitive',
              },
            },
          }),
        },
        select: {
          provider: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          company: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getUserRole(role: string | undefined) {
    return await this.client.role.findUnique({
      where: {
        name: role || 'Pack Reader',
        isActive: true,
        isDeleted: false,
      },
      select: {
        id: true,
      },
    });
  }

  async ensureUserExists(id: string) {
    const foundUser = await this.client.user.findUnique({
      where: {
        id: id,
      },
    });

    if (foundUser) {
      return foundUser;
    }
    throw new Error(errorMessages.userNotFound);
  }

  async companyUsers(
    companyId: string,
    userId: string,
    select: any,
    query: string | null,
    skip: number | null,
    take: number | null,
    isGSA: boolean = true,
  ) {
    const { roles, ...userSelect } = select;

    const companyUsers = await this.client.usersOnCompanies.findMany({
      where: {
        companyId,
        isActive: true,
        ...(isGSA ? {} : { createdByUserId: userId }), // Skip the check for GSA
        OR: query
          ? [
            { user: { email: { contains: query, mode: 'insensitive' } } },
            { user: { firstName: { contains: query, mode: 'insensitive' } } },
            { user: { lastName: { contains: query, mode: 'insensitive' } } },
          ]
          : undefined,
      },
      select: {
        isActive: true,
        accountStatus: true,
        lastSignedIn: true,
        provider: true,
        user: {
          select: {
            ...userSelect,
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
              },
            },
            roles: roles
              ? {
                where: { companyId }, // Filter roles by the current companyId
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
              }
              : undefined,
          },
        },
      },
      orderBy: {
        user: {
          firstName: 'asc',
        },
      },
      skip: skip ?? 0,
      take: take ?? 250,
    });

    if (!companyUsers?.length) {
      return [];
    }

    return companyUsers.map(({ user, isActive, accountStatus, provider }) => ({
      ...user,
      isActive,
      accountStatus,
      companies: [{ ...user.companies?.[0], provider }], // This will now only contain the matching company
      roles: user.roles?.map(({ role }: any) => ({
        ...role,
      })),
    }));
  }

  async deactivateUser(userId: string) {
    const user = this.client.user.findUnique({
      where: {
        id: userId,
        isActive: true,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return;
    }

    return this.client.user.update({
      where: {
        id: userId,
      },
      data: {
        isActive: false,
      },
      select: {
        id: true,
      },
    });
  }

  async activateUser(userId: string) {
    const user = this.client.user.findUnique({
      where: {
        id: userId,
        isActive: false,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return;
    }

    return this.client.user.update({
      where: {
        id: userId,
        isActive: false,
      },
      data: {
        isActive: true,
      },
      select: {
        id: true,
      },
    });
  }

  async deactivateCompanyUser(companyId: string, userId: string) {
    const userCompany = this.client.usersOnCompanies.findUnique({
      where: {
        userId_companyId: {
          userId,
          companyId,
        },
        isActive: true,
        user: {
          isActive: true,
        },
      },
      select: {
        userId: true,
        companyId: true,
      },
    });

    if (!userCompany) {
      return;
    }

    return this.client.usersOnCompanies.update({
      where: {
        userId_companyId: {
          userId,
          companyId,
        },
      },
      data: {
        //isActive: false,
        accountStatus: AccountStatusList.DEACTIVATED,
      },
      select: {
        userId: true,
      },
    });
  }

  async activateCompanyUser(companyId: string, userId: string) {
    const userCompany = this.client.usersOnCompanies.findUnique({
      where: {
        userId_companyId: {
          userId,
          companyId,
        },
        isActive: true,
        user: {
          isActive: true,
        },
      },
      select: {
        userId: true,
        companyId: true,
      },
    });

    if (!userCompany) {
      return;
    }

    return this.client.usersOnCompanies.update({
      where: {
        userId_companyId: {
          userId,
          companyId,
        },
      },
      data: {
        // isActive: true,
        accountStatus: AccountStatusList.ACTIVE,
      },
      select: {
        userId: true,
      },
    });
  }

  async countUserCompanies(userId: string): Promise<number> {
    return await this.client.usersOnCompanies.count({
      where: {
        userId,
      },
    });
  }

  async deleteCompanyUser(companyId: string, userId: string) {
    const userCompany = await this.client.usersOnCompanies.findUnique({
      where: {
        userId_companyId: {
          userId,
          companyId,
        },
      },
      select: {
        userId: true,
        companyId: true,
      },
    });

    if (!userCompany) {
      return;
    }

    await this.client.usersOnCompanies.update({
      where: {
        userId_companyId: {
          userId,
          companyId,
        },
      },
      data: {
        isActive: false,
        accountStatus: AccountStatusList.SUSPENDED,
      },
    });
  }

  async getGroupIdOrDefault(
    groupId: string | undefined,
    companyId: string,
    userId: string,
  ): Promise<string> {
    if (groupId) {
      return groupId;
    }

    return this.groupsService.findOrCreateDefaultGroup(companyId, userId);
  }
}
