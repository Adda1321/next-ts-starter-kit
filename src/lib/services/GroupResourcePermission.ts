import {PrismaClient} from '@prisma/client';
import BaseService from './BaseService';
import ResourcePermission from './types/ResourcePermission';

export default class GroupResourcePermission extends BaseService {
  constructor(client: PrismaClient) {
    super(client);
  }

  async updatePermissions(
    groupId: string,
    userId: string,
    resourcePermissions: ResourcePermission[],
  ) {
    // Get existing permissions
    const existingPermissions =
      await this.client.groupResourcePermission.findMany({
        where: {
          groupId,
        },
      });

    // Create maps for easier lookup
    const existingPermMap = new Map(
      existingPermissions.map((p) => [`${p.resourceId}-${p.resourceType}`, p]),
    );

    const newPermMap = new Map(
      resourcePermissions.map((p) => [`${p.resourceId}-${p.resourceType}`, p]),
    );

    // Log permissions for debugging
    console.log(`Updating permissions for group ${groupId}`);
    console.log(`Existing permissions count: ${existingPermissions.length}`);
    console.log(`New permissions count: ${resourcePermissions.length}`);

    return this.client.$transaction(async (tx) => {
      // Deactivate permissions that are no longer needed
      const permissionsToDeactivate = existingPermissions.filter(
        (p) =>
          p.isActive && !newPermMap.has(`${p.resourceId}-${p.resourceType}`),
      );

      if (permissionsToDeactivate.length > 0) {
        await tx.groupResourcePermission.updateMany({
          where: {
            id: {
              in: permissionsToDeactivate.map((p) => p.id),
            },
          },
          data: {
            isActive: false,
            hasPermission: false,
            updatedAt: new Date(),
            updatedByUserId: userId,
          },
        });
      }

      for (const permission of resourcePermissions) {
        const key = `${permission.resourceId}-${permission.resourceType}`;
        const existingPerm = existingPermMap.get(key);

        if (existingPerm) {
          // If permission exists but is not active or doesn't have permission, update it
          if (!existingPerm.isActive || !existingPerm.hasPermission) {
            await tx.groupResourcePermission.update({
              where: {id: existingPerm.id},
              data: {
                isActive: true,
                hasPermission: true,
                updatedAt: new Date(),
                updatedByUserId: userId,
              },
            });
          }
        } else {
          // Create new permission
          await tx.groupResourcePermission.create({
            data: {
              groupId,
              resourceId: permission.resourceId,
              resourceType: permission.resourceType,
              createdByUserId: userId,
              isActive: true,
              hasPermission: true,
            },
          });
        }
      }
      return true;
    });
  }

  async deleteByGroupId(groupId: string) {
    return this.client.groupResourcePermission.deleteMany({
      where: {
        groupId,
      },
    });
  }

  async findByGroupId(groupId: string) {
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
}
