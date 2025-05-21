import Permission from './Permission';

export default interface Role {
  id: String | null;
  name: String | null;
  description: String | null;
  key: String;
  permissions: Permission[];
}
