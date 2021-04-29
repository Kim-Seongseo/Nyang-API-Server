import { Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/application/exception/unexpected-error-exception';
import { RoleType } from 'src/modules/role/domain/type/role-type.enum';
import { RoleRepository } from '../../../infrastructure/repository/role.repository';

@Injectable()
export class RoleDeleteService {
  constructor(private roleRepository: RoleRepository) {}

  async delete(roleName: string): Promise<boolean> | undefined {
    try {
      await this.roleRepository.delete({ role_name: RoleType[roleName] });
      return true;
    } catch (error) {}
    throw new UnexpectedErrorException();
  }
}
