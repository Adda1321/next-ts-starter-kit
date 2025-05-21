import {PrismaClient} from '@prisma/client';
import AppPermissions from '@/src/lib/services/enums/AppPermissions';
import BaseService from '@/src/lib/services/BaseService';

export default class Permissions extends BaseService {
  constructor(client: PrismaClient) {
    super(client);
  }

  async getUserPermissions(
    userId: string,
    companyId: string | null | undefined,
  ): Promise<string[]> {
    const userFilter = {userId: userId};

    // Only add companyId filter if companyId is provided
    const companyFilter = companyId
      ? {OR: [{companyId: companyId}, {companyId: null}]}
      : {};

    const whereQuery = {
      roles: {
        some: {
          role: {
            users: {
              some: {
                AND: [userFilter, companyFilter],
              },
            },
          },
        },
      },
    };

    const permissions = await this.client.permission.findMany({
      where: whereQuery,
      select: {
        id: true,
      },
    });

    return permissions.map((permission) => permission.id);
  }

  async checkUserPermissions(
    userId: string,
    permissions: AppPermissions[],
  ): Promise<boolean> {
    const userPermissionOnRoles = await this.client.permissionsOnRoles.findMany(
      {
        where: {
          permissionId: {
            in: permissions,
          },
          role: {
            users: {
              some: {
                userId,
              },
            },
          },
        },
        select: {
          permissionId: true,
        },
      },
    );

    const userPermissions = userPermissionOnRoles.map(
      (permissionOnRole) => permissionOnRole.permissionId,
    );
    return permissions.every((permission) =>
      userPermissions.includes(permission),
    );
  }
}
