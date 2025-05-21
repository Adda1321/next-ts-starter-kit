import PermissionSelection from '@/src/lib/services/types/PermissionSelection';

export default interface RoleSelection {
  id: Boolean | undefined;
  name: Boolean | undefined;
  description: Boolean | undefined;
  permissions: PermissionSelection | undefined;
}
