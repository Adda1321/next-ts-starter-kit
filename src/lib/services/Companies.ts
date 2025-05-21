import BaseService from '@/src/lib/services/BaseService';
import UsersService from '@/src/lib/services/Users';
import {PrismaClient} from '@prisma/client';
import {CompanyInput} from './types/Company';
import {NewUserInput} from './types/User';
import {BadRequestError} from '@/src/errors';

export default class Companies extends BaseService {
  private usersService: UsersService;
  constructor(client: PrismaClient) {
    super(client);
    this.usersService = new UsersService(client);
  }

  async createCompanyWithUser(
    companyInput: CompanyInput,
    userInput: NewUserInput,
    createdByUserId: string,
  ) {
    const company = await this.createCompany(companyInput, createdByUserId);

    const {id: companyId} = company;
    const user = await this.usersService.addUser({
      ...userInput,
      companyId,
      createdByUserId,
    });

    const {id: userId} = user;

    await this.client.$transaction(async (tx) => {
      const [roles, existingUserRoles] = await Promise.all([
        tx.role.findMany({
          where: {
            isActive: true,
            isDeleted: false,
          },
          select: {id: true},
        }),
        tx.rolesOnUsers.findMany({
          where: {
            userId,
            companyId,
          },
          select: {roleId: true},
        }),
      ]);

      const existingRoleIds = new Set(existingUserRoles.map((r) => r.roleId));

      const rolesToAssign = roles.filter(
        (role) => !existingRoleIds.has(role.id),
      );

      if (rolesToAssign.length > 0) {
        const createdAt = new Date().toISOString();
        const roleAssignments = rolesToAssign.map(({id: roleId}) => ({
          userId: userId,
          roleId,
          companyId,
          createdByUserId,
          createdAt,
        }));

        await tx.rolesOnUsers.createMany({
          data: roleAssignments,
          skipDuplicates: true,
        });
      }
    });

    return {company, user};
  }

  async createCompany(companyInput: CompanyInput, createdByUserId: string) {
    return await this.client.company.create({
      data: {
        ...companyInput,
        createdByUserId,
        createdAt: new Date().toISOString(),
      },
      select: {id: true, name: true},
    });
  }

  async updateCompany(companyId: string, companyInput: CompanyInput) {
    return await this.client.company.update({
      where: {id: companyId},
      data: {
        ...companyInput,
        updatedAt: new Date().toISOString(),
      },
      select: {id: true, name: true},
    });
  }

  async addCompanyUser(
    companyId: string,
    userId: string,
    createdByUserId: string,
  ) {
    await this.usersService.ensureUserExists(userId);
    await this.client.usersOnCompanies.create({
      data: {
        userId,
        companyId,
        createdByUserId,
        createdAt: new Date().toISOString(),
      },
    });
  }

  async existingCompany(companyInput: CompanyInput) {
    return await this.client.company.findFirst({
      where: {
        AND: [
          {name: {equals: companyInput.name, mode: 'insensitive'}},
          {
            countryCode: {
              equals: companyInput.countryCode,
              mode: 'insensitive',
            },
          },
        ],
      },
      select: {id: true, name: true},
    });
  }

  async exists(companyId: string) {
    const company = await this.client.company.findUnique({
      where: {
        id: companyId,
      },
      select: {
        id: true,
      },
    });
    return !!company;
  }

  async getCompanyUsers(
    companyId: string,
    userSelect: any = null,
  ): Promise<any[]> {
    const users = await this.client.user.findMany({
      where: {
        companies: {
          some: {
            companyId,
          },
        },
      },
      select: {
        ...userSelect,
        id: true,
      },
    });

    return users.map((user) => ({
      id: user.id,
    }));
  }
}
