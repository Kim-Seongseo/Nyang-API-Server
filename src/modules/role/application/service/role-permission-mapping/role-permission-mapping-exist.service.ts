import { Inject, Injectable } from '@nestjs/common';
import { ROLE_PERMISSION_MAPPING_PORT } from 'src/modules/role/domain/port/port.constant';
import { RolePermissionMappingPort } from 'src/modules/role/domain/port/role-permission-mapping.port';

@Injectable()
export class RolePermissionMappingExistService {
  constructor(
    @Inject(ROLE_PERMISSION_MAPPING_PORT)
    private readonly rolePermissionMappingPort: RolePermissionMappingPort,
  ) {}

  async isExist(
    roleName: string,
    permissionName: string,
  ): Promise<boolean | undefined> {
    const countRolePermissionMapping: number = await this.rolePermissionMappingPort.CountRolePermissionMappingByName(
      roleName,
      permissionName,
    );
    if (countRolePermissionMapping === 0) {
      return false;
    }
    return true;
  }
}
