import { RolePermissionMapping } from '../entity/role-permission-mapping.entity';
import { PermissionType } from '../type/permission-type.enum';
import { RoleType } from '../type/role-type.enum';

export interface RolePermissionMappingPort {
  findRolePermissionMappingByRoleIndentifier(
    roleIdentifier: number,
  ): Promise<RolePermissionMapping[] | undefined>;

  CountRolePermissionMappingByName(
    roleName: string,
    permissionName: string,
  ): Promise<number | undefined>;

  createRolePermissionMapping(
    roleName: RoleType,
    permissionName: PermissionType,
  ): Promise<number | undefined>;
}
