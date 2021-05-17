import { Permission } from '../entity/permission.entity';
import { PermissionType } from '../type/permission-type.enum';

export interface PermissionPort {
  findPermissionsByMember(
    memberIdentifier: number,
  ): Promise<Permission[] | undefined>;

  findPermissionByName(
    permissionName: PermissionType,
  ): Promise<Permission[] | undefined>;

  deletePermissionByName(
    permissionName: PermissionType,
  ): Promise<number | undefined>;

  createPermission(permissionName: PermissionType): Promise<number | undefined>;
}
