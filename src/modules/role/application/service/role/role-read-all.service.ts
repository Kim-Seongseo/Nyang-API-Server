import { Injectable } from '@nestjs/common';
import { Role } from 'src/modules/role/domain/entity/role.entity';
import { RoleRepository } from 'src/modules/role/infrastructure/repository/role.repository';

@Injectable()
export class RoleReadAllService {
  constructor(private roleRepository: RoleRepository) {}

  async readAll(): Promise<string[]> {
    const roles: Pick<Role, 'role_name'>[] = await this.roleRepository.find();
    const result = roles.map((role) => {
      return role['role'];
    });
    return result;
  }
}
