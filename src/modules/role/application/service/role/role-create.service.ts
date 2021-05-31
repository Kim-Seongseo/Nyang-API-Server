import { Inject, Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { ROLE_PORT } from 'src/modules/role/domain/port/port.constant';
import { RolePort } from 'src/modules/role/domain/port/role.port';
import { DuplicatedRoleException } from '../../exception/duplicated-name.exception';
import { RoleExistService } from './role-exist.service';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class RoleCreateService {
  constructor(
    @Inject(ROLE_PORT) private rolePort: RolePort,
    private readonly roleExistService: RoleExistService,
  ) {}

  @Transactional()
  async create(roleName: string): Promise<number | undefined> {
    if (await this.roleExistService.isExist(roleName)) {
      throw new DuplicatedRoleException();
    }
    try {
      return await this.rolePort.createRole(roleName);
    } catch (error) {
      console.log(error);
      throw new UnexpectedErrorException();
    }
  }
}
