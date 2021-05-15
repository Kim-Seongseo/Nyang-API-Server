import { Injectable } from '@nestjs/common';
import { PermissionType } from 'src/modules/role/domain/type/permission-type.enum';
import { PermissionRepository } from 'src/modules/role/infrastructure/persistence/repository/permission.repository';

@Injectable()
export class PermissionExistService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async isExist(permissionName: string): Promise<boolean | undefined> {
    const permissions = await this.permissionRepository.find({
      permission_name: PermissionType[permissionName],
    });
    if (permissions.length === 0) {
      return false;
    }
    return true;
  }
}
