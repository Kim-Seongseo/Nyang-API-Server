import { Injectable } from '@nestjs/common';
import { RoleType } from 'src/modules/role/domain/type/role-type.enum';
import { RoleRepository } from 'src/modules/role/infrastructure/persistence/repository/role.repository';

@Injectable()
export class RoleExistService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async isExist(roleName: string): Promise<boolean | undefined> {
    const roles = await this.roleRepository.find({
      role_name: RoleType[roleName],
    });
    if (roles.length === 0) {
      return false;
    }
    return true;
  }
}
