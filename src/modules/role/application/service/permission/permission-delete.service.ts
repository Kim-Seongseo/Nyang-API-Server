import { Inject, Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { PermissionPort } from 'src/modules/role/domain/port/permission.port';
import { PERMISSION_PORT } from 'src/modules/role/domain/port/port.constant';
import { PermissionType } from 'src/modules/role/domain/type/permission-type.enum';

@Injectable()
export class PermissionDeleteService {
  constructor(
    @Inject(PERMISSION_PORT) private permissionPort: PermissionPort,
  ) {}

  async delete(permissionName: string): Promise<number | undefined> {
    try {
      // 여기
      const identifier = await this.permissionPort.deletePermissionByName(
        PermissionType[permissionName],
      );
      return identifier;
    } catch (error) {}
    throw new UnexpectedErrorException();
  }
}
