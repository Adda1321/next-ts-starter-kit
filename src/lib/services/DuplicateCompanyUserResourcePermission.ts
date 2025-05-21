import BaseService from '@/src/lib/services/BaseService';
import {PrismaClient} from '@prisma/client';
import {resourceTypeConverter} from '@/src/lib/converters';
import ResourcePermission from './types/ResourcePermission';

export default class DupCompanyUserResourcePermission extends BaseService {
  constructor(client: PrismaClient) {
    super(client);
  }

  async batchUpsertOptimized(
    companyId: string,
    userId: string,
    resourcePermissions: ResourcePermission[],
    requestingUserId: string,
  ) {
    // Build an OR filter array so we fetch only the records that match any of the input resource keys.
    const orClause = resourcePermissions.map((rp) => ({
      permissionId: rp.permissionId,
      resourceId: rp.resourceId,
      resourceType: rp.resourceType,
    }));

    // Fetch only the existing permissions for the provided resource items.
    const existingResourcePermissions =
      await this.client.companyUserResourcePermission.findMany({
        where: {
          companyId,
          userId,
          OR: orClause,
        },
        select: {
          permissionId: true,
          resourceId: true,
          resourceType: true,
          isActive: true,
          hasPermission: true,
        },
      });

    // Helper function to create a composite key from a permission object.
    const createResourcePermissionKey = ({
      permissionId,
      resourceId,
      resourceType,
    }: Partial<ResourcePermission>) =>
      `${permissionId}-${resourceId}-${resourceType}`;

    // Create a set of keys from the incoming resourcePermissions.
    const resourcePermissionsSet = new Set(
      resourcePermissions.map(createResourcePermissionKey),
    );

    // Map the existing permissions by their composite key.
    const existingPermissionsMap = new Map(
      existingResourcePermissions.map((permission) => [
        createResourcePermissionKey({
          resourceId: permission.resourceId,
          permissionId: permission.permissionId,
          resourceType: resourceTypeConverter.toResourceType(
            permission.resourceType,
          ),
        }),
        permission,
      ]),
    );

    // Build arrays for create and update requests.
    const grantResourcePermissionsCreateRequests: any[] = [];
    const grantResourcePermissionsUpdateRequests: any[] = [];

    for (const resourcePermission of resourcePermissions) {
      const resourcePermissionKey =
        createResourcePermissionKey(resourcePermission);
      const existingResourcePermission = existingPermissionsMap.get(
        resourcePermissionKey,
      );

      if (!existingResourcePermission) {
        // Create new permission record if it doesn't exist.
        grantResourcePermissionsCreateRequests.push({
          ...resourcePermission,
          companyId,
          userId,
          createdByUserId: requestingUserId,
          hasPermission: resourcePermission.hasPermission, // <-- Dynamically assign
          isActive: true,
        });
      } else if (
        existingResourcePermission.isActive === false ||
        existingResourcePermission.hasPermission !==
          resourcePermission.hasPermission
      ) {
        // Update record if it's inactive or if its current hasPermission is different from the provided value.
        grantResourcePermissionsUpdateRequests.push({
          where: {
            companyId_userId_permissionId_resourceType_resourceId: {
              companyId,
              userId,
              permissionId: resourcePermission.permissionId,
              resourceId: resourcePermission.resourceId,
              resourceType: resourcePermission.resourceType,
            },
          },
          data: {
            isActive: true,
            hasPermission: resourcePermission.hasPermission, // <-- Now dynamic
          },
        });
      }
    }

    // Find any existing permissions that should be revoked because they were not included in the new list.
    const revokeResourcePermissionsUpdateRequests = existingResourcePermissions
      .filter((permission) => permission.hasPermission)
      .filter(
        (permission) =>
          !resourcePermissionsSet.has(
            createResourcePermissionKey({
              resourceId: permission.resourceId,
              permissionId: permission.permissionId,
              resourceType: resourceTypeConverter.toResourceType(
                permission.resourceType,
              ),
            }),
          ),
      )
      .map((resourcePermission) => ({
        where: {
          companyId_userId_permissionId_resourceType_resourceId: {
            companyId,
            userId,
            permissionId: resourcePermission.permissionId,
            resourceId: resourcePermission.resourceId,
            resourceType: resourcePermission.resourceType,
          },
        },
        data: {
          isActive: false,
          hasPermission: false,
        },
      }));

    const resourcePermissionUpdateRequests = [
      ...grantResourcePermissionsUpdateRequests,
      ...revokeResourcePermissionsUpdateRequests,
    ];

    if (
      !grantResourcePermissionsCreateRequests.length &&
      !resourcePermissionUpdateRequests.length
    ) {
      return;
    }

    await this.client.$transaction([
      this.client.companyUserResourcePermission.createMany({
        data: grantResourcePermissionsCreateRequests,
      }),
      ...resourcePermissionUpdateRequests.map((request) =>
        this.client.companyUserResourcePermission.update({
          where: request.where,
          data: {
            ...request.data,
            updatedByUserId: requestingUserId,
            updatedAt: new Date().toISOString(),
          },
        }),
      ),
    ]);
  }
}
