import { Injectable } from '@nestjs/common';
import { RolePermissionMapping } from '../../domain/entity/role-permission-mapping.entity';
import { RolePermissionMappingPort } from '../../domain/port/role-permission-mapping.port';
import { PermissionType } from '../../domain/type/permission-type.enum';
import { RoleType } from '../../domain/type/role-type.enum';
import { RolePermissionMappingRepository } from './repository/role-permission-mapping-repository';

@Injectable()
export class RolePermissionMappingAdapter implements RolePermissionMappingPort {
  constructor(
    private readonly rolePermissionMappingRepository: RolePermissionMappingRepository,
  ) {}

  async CountRolePermissionMappingByName(
    roleName: string,
    permissionName: string,
  ): Promise<number | undefined> {
    return await this.rolePermissionMappingRepository.count({
      role: { role_name: RoleType[roleName] },
      permission: { permission_name: PermissionType[permissionName] },
    });
  }

  async findRolePermissionMappingByRoleIndentifier(
    roleIdentifier: number,
  ): Promise<RolePermissionMapping[] | undefined> {
    const permissions: RolePermissionMapping[] = await this.rolePermissionMappingRepository.find(
      {
        role: { identifier: roleIdentifier },
      },
    );
    return permissions;
  }

  async createRolePermissionMapping(
    roleName: RoleType,
    permissionName: PermissionType,
  ): Promise<number | undefined> {
    const rolePermission: RolePermissionMapping = await this.rolePermissionMappingRepository.create(
      {
        role: { role_name: roleName },
        permission: { permission_name: permissionName },
      },
    );
    await this.rolePermissionMappingRepository.save(rolePermission);
    return rolePermission.identifier;
  }
}
