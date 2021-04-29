import { Injectable } from '@nestjs/common';
import { PermissionType } from 'src/modules/role/domain/type/permission-type.enum';
import { PermissionInitializationFailed } from '../../exception/initialization-failed.exception';
import { PermissionCreateService } from './permission-create.service';

@Injectable()
export class PermissionInitService {
  constructor(private permissionCreateService: PermissionCreateService) {}
  async init(): Promise<boolean | undefined> {
    try {
      const permissionTypes = PermissionType;
      for (const key in permissionTypes) {
        await this.permissionCreateService.create(key);
      }
    } catch (error) {
      throw new PermissionInitializationFailed();
    }
    return true;
  }
}
