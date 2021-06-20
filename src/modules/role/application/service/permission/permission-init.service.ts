import { Inject, Injectable } from '@nestjs/common';
import { PermissionPort } from 'src/modules/role/domain/port/permission.port';
import { PERMISSION_PORT } from 'src/modules/role/domain/port/port.constant';
import { PermissionType } from 'src/modules/role/domain/type/permission-type.enum';
import { PermissionInitializationFailed } from '../../exception/initialization-failed.exception';

@Injectable()
export class PermissionInitService {
  constructor(
    @Inject(PERMISSION_PORT) private permissionPort: PermissionPort,
  ) {}
  async init(): Promise<boolean | undefined> {
    try {
      const permissionTypes = PermissionType;
      for (const key in permissionTypes) {
        //여기
        await this.permissionPort.createPermission(PermissionType[key]);
      }
    } catch (error) {
      throw new PermissionInitializationFailed();
    }
    return true;
  }
}
