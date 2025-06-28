import Role from './Role';
import {AccountStatusList} from '@prisma/client';

export default interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  telephone: string | null;
  lastSignedIn?: Date | null;
  createdAt?: Date;
  accountStatus?: AccountStatusList | null;
  roles?: Role[] | null;
  updatedAt?: Date | null;
  isActive?: boolean;
  password?: string | null;
}

export interface NewUserInput {
  email: string;
  firstName: string;
  lastName: string;
  telephone?: string;
  password: string;
  companyId: string;
  createdByUserId: string;
}
