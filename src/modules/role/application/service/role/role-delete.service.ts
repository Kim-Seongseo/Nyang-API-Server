import { Inject, Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { ROLE_PORT } from 'src/modules/role/domain/port/port.constant';
import { RolePort } from 'src/modules/role/domain/port/role.port';

@Injectable()
export class RoleDeleteService {
  constructor(@Inject(ROLE_PORT) private rolePort: RolePort) {}

  async delete(roleName: string): Promise<number | undefined> {
    try {
      return await this.rolePort.deleteRoleByName(roleName);
    } catch (error) {}
    throw new UnexpectedErrorException();
  }
}
