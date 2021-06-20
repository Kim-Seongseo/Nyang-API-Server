import { Injectable } from '@nestjs/common';
import { PermissionType } from 'src/modules/role/domain/type/permission-type.enum';
import {
  AdminPermission,
  EditorPermission,
  MemberPermission,
} from 'src/modules/role/domain/type/role-permission-type.enum';
import { RoleType } from 'src/modules/role/domain/type/role-type.enum';
import { PermissionPerRoleInitializationFailed } from '../../exception/initialization-failed.exception';
import { RolePermissionMappingCreateService } from './role-permission-mapping-create.service';

@Injectable()
export class RolePermissionMappingInitService {
  constructor(
    private readonly rolePermissionMappingCreateService: RolePermissionMappingCreateService,
  ) {}
  async init(): Promise<boolean | undefined> {
    try {
      const map = new Map<string, any>();
      map.set('MEMBER', MemberPermission);
      map.set('ADMIN', AdminPermission);
      map.set('EDITOR', EditorPermission);

      for (const [key, value] of map) {
        for (const permissionName in value) {
          console.log('->' + key);
          await this.rolePermissionMappingCreateService.create(
            RoleType[key],
            PermissionType[permissionName],
          );
        }
      }
    } catch (error) {
      console.log(error);
      throw new PermissionPerRoleInitializationFailed();
    }
    return true;
  }

  async;
}
