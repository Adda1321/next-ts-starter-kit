import {PrismaClient} from '@prisma/client';
import {Role, RoleSelection} from '@/src/lib/services/types';
import BaseService from '@/src/lib/services/BaseService';

export default class Roles extends BaseService {
  private defaultRoleSelection: RoleSelection = {
    id: true,
    name: true,
    description: true,
    permissions: {
      id: true,
      name: true,
      description: true,
    },
  };

  constructor(client: PrismaClient) {
    super(client);
  }

  async getUserRoles(
    userId: String,
    selection: RoleSelection | null = null,
  ): Promise<Role[]> {
    return this.getRoles(
      {
        userId,
      },
      selection,
    );
  }

  async getRole(
    id: string,
    selection: RoleSelection | null = null,
  ): Promise<Role | null> {
    const role = await this.client.role.findUnique({
      where: {id},
      select: this.getRoleSelection(selection || this.defaultRoleSelection),
    });

    return role ? this.formatRolePermissions(role) : null;
  }

  private async getRoles(
    filter: any,
    selection: RoleSelection | null,
  ): Promise<Role[]> {
    const roleOnUsers = await this.client.rolesOnUsers.findMany({
      where: {
        ...filter,
        role: {
          isDeleted: false,
          isActive: true,
          permissions: {
            every: {
              permission: {
                isActive: true,
                isDeleted: false,
              },
            },
          },
        },
      },
      select: {
        // role: this.getRoleSelection(selection || this.defaultRoleSelection),
        role: {
          select: this.getRoleSelection(selection || this.defaultRoleSelection),
        },
      },
    });

    return (roleOnUsers || [])
      .map((roleOnUser) => roleOnUser.role)
      .map(this.formatRolePermissions);
  }

  // @ts-ignore
  private formatRolePermissions = (role: any): Role => ({
    id: role.id,
    name: role.name,
    description: role.description,
    permissions: (role.permissions || [])
      // @ts-ignore
      .filter(({permission}) => permission)
      // @ts-ignore
      .map(({permission}) => ({
        id: permission.id,
        name: permission.name,
        description: permission.description,
      })),
  });

  private getRoleSelection = (selection: RoleSelection): any => {
    const {permissions, ...roleSelect} = selection;

    if (!permissions) {
      return roleSelect;
    }

    return {
      ...roleSelect,
      permissions: {
        select: {
          permission: {
            select: {
              id: true,
              name: true,
              description: true,
            },
          },
        },
      },
    };
  };
}
