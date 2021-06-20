import { Inject, Injectable } from '@nestjs/common';
import { ROLE_PERMISSION_MAPPING_PORT } from 'src/modules/role/domain/port/port.constant';
import { RolePermissionMappingPort } from 'src/modules/role/domain/port/role-permission-mapping.port';
import { PermissionType } from 'src/modules/role/domain/type/permission-type.enum';
import { RoleType } from 'src/modules/role/domain/type/role-type.enum';
import { DuplicatedPermissionPerRoleException } from '../../exception/duplicated-name.exception';
import { RolePermissionMappingExistService } from './role-permission-mapping-exist.service';

@Injectable()
export class RolePermissionMappingCreateService {
  constructor(
    @Inject(ROLE_PERMISSION_MAPPING_PORT)
    private readonly rolePermissionMappingPort: RolePermissionMappingPort,
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

    const rolePermissionIdentifier: number = await this.rolePermissionMappingPort.createRolePermissionMapping(
      roleName,
      permissionName,
    );
    return rolePermissionIdentifier;
  }
}
