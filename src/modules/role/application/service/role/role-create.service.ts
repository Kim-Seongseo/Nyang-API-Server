import { Inject, Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { ROLE_PORT } from 'src/modules/role/domain/port/port.constant';
import { RolePort } from 'src/modules/role/domain/port/role.port';
import { RoleType } from 'src/modules/role/domain/type/role-type.enum';
import { RoleRepository } from '../../../infrastructure/persistence/repository/role.repository';
import { DuplicatedRoleException } from '../../exception/duplicated-name.exception';
import { RoleExistService } from './role-exist.service';

@Injectable()
export class RoleCreateService {
  constructor(
    @Inject(ROLE_PORT) private rolePort: RolePort,
    private readonly roleExistService: RoleExistService,
  ) {}

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
