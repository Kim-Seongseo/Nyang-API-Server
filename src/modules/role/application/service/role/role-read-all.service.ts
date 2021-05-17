import { Inject, Injectable } from '@nestjs/common';
import { Role } from 'src/modules/role/domain/entity/role.entity';
import { ROLE_PORT } from 'src/modules/role/domain/port/port.constant';
import { RolePort } from 'src/modules/role/domain/port/role.port';

@Injectable()
export class RoleReadAllService {
  constructor(@Inject(ROLE_PORT) private rolePort: RolePort) {}

  async readAll(): Promise<string[]> {
    const roles: Pick<Role, 'role_name'>[] = await this.rolePort.findAll();
    const result = roles.map((role) => {
      return role['role'];
    });
    return result;
  }
}
