import { Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { RoleType } from 'src/modules/role/domain/type/role-type.enum';
import { RoleRepository } from '../../../infrastructure/repository/role.repository';
import { DuplicatedRoleException } from '../../exception/duplicated-name.exception';
import { RoleExistService } from './role-exist.service';

@Injectable()
export class RoleCreateService {
  constructor(
    private roleRepository: RoleRepository,
    private readonly roleExistService: RoleExistService,
  ) {}

  async create(roleName: string): Promise<number | undefined> {
    let role = null;
    if (await this.roleExistService.isExist(roleName)) {
      throw new DuplicatedRoleException();
    }
    try {
      role = await this.roleRepository.create({
        role_name: RoleType[roleName],
      });
      await this.roleRepository.save(role);
    } catch (error) {
      console.log(error);
      throw new UnexpectedErrorException();
    }
    return role.identifier;
  }
}
