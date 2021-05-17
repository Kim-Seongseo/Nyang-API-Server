import { Inject, Injectable } from '@nestjs/common';
import { RolePermissionMapping } from 'src/modules/role/domain/entity/role-permission-mapping.entity';
import { ROLE_PERMISSION_MAPPING_PORT } from 'src/modules/role/domain/port/port.constant';
import { RolePermissionMappingPort } from 'src/modules/role/domain/port/role-permission-mapping.port';

@Injectable()
export class RolePermissionMappingReadService {
  constructor(
    @Inject(ROLE_PERMISSION_MAPPING_PORT)
    private readonly rolePermissionMappingPort: RolePermissionMappingPort,
  ) {}

  async readPermissions(roleIdentifier: number): Promise<string[]> {
    const permissions: RolePermissionMapping[] = await this.rolePermissionMappingPort.findRolePermissionMappingByRoleIndentifier(
      roleIdentifier,
    );

    const result = await Promise.all(
      permissions.map(
        async (permission): Promise<string | undefined> => {
          return (await permission.permission).permission_name;
        },
      ),
    );
    return result;
  }
}
