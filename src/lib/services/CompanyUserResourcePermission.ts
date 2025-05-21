import BaseService from '@/src/lib/services/BaseService';
import {PrismaClient} from '@prisma/client';
import {resourceTypeConverter} from '@/src/lib/converters';
import ResourcePermission from './types/ResourcePermission';

export default class CompanyUserResourcePermission extends BaseService {
  constructor(client: PrismaClient) {
    super(client);
  }

  async batchUpsert(
    companyId: string,
    userId: string,
    resourcePermissions: ResourcePermission[],
    requestingUserId: string,
  ) {
    const existingResourcePermissions =
      await this.client.companyUserResourcePermission.findMany({
        where: {
          companyId,
          userId,
        },
        select: {
          permissionId: true,
          resourceId: true,
          resourceType: true,
          isActive: true,
          hasPermission: true,
        },
      });

    const createResourcePermissionKey = ({
      permissionId,
      resourceId,
      resourceType,
    }: Partial<ResourcePermission>) =>
      `${permissionId}-${resourceId}-${resourceType}`;

    const resourcePermissionsSet = new Set(
      resourcePermissions.map(createResourcePermissionKey),
    );
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

    const grantResourcePermissionsCreateRequests = [];
    const grantResourcePermissionsUpdateRequests = [];

    for (const resourcePermission of resourcePermissions) {
      const resourcePermissionKey =
        createResourcePermissionKey(resourcePermission);
      if (!existingPermissionsMap.has(resourcePermissionKey)) {
        grantResourcePermissionsCreateRequests.push({
          ...resourcePermission,
          companyId,
          userId,
          createdByUserId: requestingUserId,
          hasPermission: true,
          isActive: true,
        });

        continue;
      }

      const existingResourcePermission = existingPermissionsMap.get(
        resourcePermissionKey,
      );
      if (
        existingResourcePermission?.isActive === false ||
        existingResourcePermission?.hasPermission === false
      ) {
        grantResourcePermissionsUpdateRequests.push({
          where: {
            companyId_userId_permissionId_resourceType_resourceId: {
              ...resourcePermission,
              companyId,
              userId,
            },
          },
          data: {
            isActive: true,
            hasPermission: true,
          },
        });
      }
    }

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
