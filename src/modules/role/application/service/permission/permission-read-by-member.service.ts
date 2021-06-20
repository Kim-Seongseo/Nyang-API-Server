import { Inject, Injectable } from '@nestjs/common';
import { PermissionPort } from 'src/modules/role/domain/port/permission.port';
import { PERMISSION_PORT } from 'src/modules/role/domain/port/port.constant';

@Injectable()
export class PermissionReadByMemberService {
  constructor(
    @Inject(PERMISSION_PORT) private permissionPort: PermissionPort,
  ) {}

  async readByMember(memberIdentifier: number): Promise<string[]> {
    const permissionList = await this.permissionPort.findPermissionsByMember(
      memberIdentifier,
    );
    const permissions: string[] = permissionList.map((permission) => {
      return permission.permission_name;
    });
    return permissions;
  }
}
