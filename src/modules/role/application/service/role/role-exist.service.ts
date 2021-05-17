import { Inject, Injectable } from '@nestjs/common';
import { Role } from 'src/modules/role/domain/entity/role.entity';
import { ROLE_PORT } from 'src/modules/role/domain/port/port.constant';
import { RolePort } from 'src/modules/role/domain/port/role.port';
import { RoleType } from 'src/modules/role/domain/type/role-type.enum';

@Injectable()
export class RoleExistService {
  constructor(@Inject(ROLE_PORT) private readonly rolePort: RolePort) {}

  async isExist(roleName: string): Promise<boolean | undefined> {
    const role: Role = await this.rolePort.findRoleByName(roleName);

    if (role) {
      return false;
    }
    return true;
  }
}
