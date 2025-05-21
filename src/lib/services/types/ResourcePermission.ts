import ResourceType from '../enums/ResourceType';

export default interface ResourcePermission {
  permissionId: string;
  resourceId: string;
  resourceType: ResourceType;
  hasPermission?: boolean;
}
