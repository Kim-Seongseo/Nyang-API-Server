import { Injectable } from '@nestjs/common';
import { RolePermissionMapping } from 'src/modules/role/domain/entity/role-permission-mapping.entity';
import { RolePermissionMappingRepository } from 'src/modules/role/infrastructure/repository/role-permission-mapping-repository';

@Injectable()
export class RolePermissionMappingReadService {
  constructor(
    private rolePermissionMappingRepository: RolePermissionMappingRepository,
  ) {}

  async readPermissions(roleIdentifier: number): Promise<string[]> {
    const permissions: RolePermissionMapping[] = await this.rolePermissionMappingRepository.find(
      {
        role: { identifier: roleIdentifier },
      },
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
