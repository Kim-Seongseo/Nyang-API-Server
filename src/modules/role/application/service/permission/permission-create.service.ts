import { Inject, Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { PermissionPort } from 'src/modules/role/domain/port/permission.port';
import { PERMISSION_PORT } from 'src/modules/role/domain/port/port.constant';
import { PermissionType } from 'src/modules/role/domain/type/permission-type.enum';
import { DuplicatedPermissionException } from '../../exception/duplicated-name.exception';
import { PermissionExistService } from './permission-exist.service';

@Injectable()
export class PermissionCreateService {
  constructor(
    @Inject(PERMISSION_PORT) private readonly permissionPort: PermissionPort,
    private readonly permissionExistService: PermissionExistService,
  ) {}
  async create(permissionName: string): Promise<number | undefined> {
    const role = null;
    if (await this.permissionExistService.isExist(permissionName)) {
      throw new DuplicatedPermissionException();
    }
    try {
      // 여기
      const roleIdentifier: number = await this.permissionPort.createPermission(
        PermissionType[permissionName],
      );
      return roleIdentifier;
    } catch (error) {
      console.log(error);
      throw new UnexpectedErrorException();
    }
  }
}
