import { Injectable } from '@nestjs/common';
import { PermissionType } from 'src/modules/role/domain/type/permission-type.enum';
import { RoleType } from 'src/modules/role/domain/type/role-type.enum';
import { RolePermissionMappingRepository } from 'src/modules/role/infrastructure/persistence/repository/role-permission-mapping-repository';

@Injectable()
export class RolePermissionMappingExistService {
  constructor(
    private readonly rolePermissionMappingRepository: RolePermissionMappingRepository,
  ) {}

  async isExist(
    roleName: string,
    permissionName: string,
  ): Promise<boolean | undefined> {
    const permissionPerRoles = await this.rolePermissionMappingRepository.find({
      role: { role_name: RoleType[roleName] },
      permission: { permission_name: PermissionType[permissionName] },
    });
    if (permissionPerRoles.length === 0) {
      return false;
    }
    return true;
  }
}
