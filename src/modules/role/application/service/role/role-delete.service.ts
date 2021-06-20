import { Inject, Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { ROLE_PORT } from 'src/modules/role/domain/port/port.constant';
import { RolePort } from 'src/modules/role/domain/port/role.port';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class RoleDeleteService {
  constructor(@Inject(ROLE_PORT) private rolePort: RolePort) {}

  @Transactional()
  async delete(roleName: string): Promise<number | undefined> {
    try {
      return await this.rolePort.deleteRoleByName(roleName);
    } catch (error) {}
    throw new UnexpectedErrorException();
  }
}
