import { Inject, Injectable } from '@nestjs/common';
import { Permission } from 'src/modules/role/domain/entity/permission.entity';
import { PermissionPort } from 'src/modules/role/domain/port/permission.port';
import { PERMISSION_PORT } from 'src/modules/role/domain/port/port.constant';
import { PermissionType } from 'src/modules/role/domain/type/permission-type.enum';

@Injectable()
export class PermissionExistService {
  constructor(
    @Inject(PERMISSION_PORT) private readonly permissionPort: PermissionPort,
  ) {}

  async isExist(permissionName: string): Promise<boolean | undefined> {
    // 여기
    const permissions: Permission[] = await this.permissionPort.findPermissionByName(
      PermissionType[permissionName],
    );

    if (permissions.length === 0) {
      return false;
    }
    return true;
  }
}
