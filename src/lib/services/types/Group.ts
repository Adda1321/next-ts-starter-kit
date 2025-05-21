import ResourcePermission from './ResourcePermission';

export interface GroupInput {
  name: string;
  description?: string;
  type: string;
  companyId: string;
  userIds: string[];
  managerIds: string[];
  isSuperGroup: boolean;
  autoAddCurrentUserAsAdmin?: boolean;
}

export interface GroupUserSelect {
  id?: boolean;
  firstName?: boolean;
  lastName?: boolean;
  email?: boolean;
}

export interface GroupSelect {
  id?: boolean;
  name?: boolean;
  description?: boolean;
  type?: boolean;
  companyId?: boolean;
  isActive?: boolean;
  isSuperGroup?: boolean;
  createdAt?: boolean;
  createdByUserId?: boolean;
  updatedAt?: boolean;
  updatedByUserId?: boolean;
  users?: {
    select?: {
      user?: {
        select?: GroupUserSelect;
      };
    };
  };
  managers?: {
    select?: {
      manager?: {
        select?: GroupUserSelect;
      };
    };
  };
  resourcePermissions?: {
    select: {
      resourceId: boolean;
      resourceType: boolean;
    };
  };
}
