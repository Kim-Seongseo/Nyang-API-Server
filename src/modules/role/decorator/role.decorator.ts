import { SetMetadata } from '@nestjs/common';
import { PermissionType } from '../domain/type/permission-type.enum';

export const PERMISSION_KEY = 'permissions';

export const Permissions = (...permissionTypes: PermissionType[]) =>
  SetMetadata(PERMISSION_KEY, permissionTypes);
