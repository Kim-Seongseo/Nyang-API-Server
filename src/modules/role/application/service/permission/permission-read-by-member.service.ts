import { Inject, Injectable } from '@nestjs/common';
import {
  PermissionPort,
  PERMISSION_PORT,
} from 'src/modules/role/domain/port/permissions.port';
import { PersistenceAdapter } from 'src/modules/role/infrastructure/persistence/persistence.adapter';

@Injectable()
export class PermissionReadByMemberService {
  constructor(
    @Inject(PERMISSION_PORT) private PermissionPort: PermissionPort,
  ) {}

  async readByMember(memberIdentifier: number): Promise<string[]> {
    const permissionList = await this.PermissionPort.findPermissionsByMember(
      memberIdentifier,
    );
    const permissions: string[] = permissionList.map((permission) => {
      return permission.permission_name;
    });
    return permissions;
  }
}
