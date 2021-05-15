import { Injectable } from '@nestjs/common';
import { PermissionType } from 'src/modules/role/domain/type/permission-type.enum';
import { RoleType } from 'src/modules/role/domain/type/role-type.enum';
import { PermissionRepository } from 'src/modules/role/infrastructure/persistence/repository/permission.repository';
import { RolePermissionMappingRepository } from 'src/modules/role/infrastructure/persistence/repository/role-permission-mapping-repository';
import { RoleRepository } from 'src/modules/role/infrastructure/persistence/repository/role.repository';
import { DuplicatedPermissionPerRoleException } from '../../exception/duplicated-name.exception';
import { RolePermissionMappingExistService } from './role-permission-mapping-exist.service';

@Injectable()
export class RolePermissionMappingCreateService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly permissionRepository: PermissionRepository,
    private readonly rolePermissionMappingRepository: RolePermissionMappingRepository,
    private readonly rolePermissionMappingExistService: RolePermissionMappingExistService,
  ) {}

  async create(
    roleName: RoleType,
    permissionName: PermissionType,
  ): Promise<number | undefined> {
    if (
      await this.rolePermissionMappingExistService.isExist(
        roleName,
        permissionName,
      )
    ) {
      throw new DuplicatedPermissionPerRoleException();
    }

    const permissionPerRole = await this.rolePermissionMappingRepository.create(
      {
        role: await this.roleRepository.findOne({
          role_name: roleName,
        }),
        permission: await this.permissionRepository.findOne({
          permission_name: permissionName,
        }),
      },
    );
    await this.rolePermissionMappingRepository.save(permissionPerRole);
    return permissionPerRole.identifier;
  }
}
