import { Injectable } from '@nestjs/common';
import { number } from 'joi';
import { Role } from '../../domain/entity/role.entity';
import { RolePort } from '../../domain/port/role.port';
import { RoleType } from '../../domain/type/role-type.enum';
import { RoleRepository } from './repository/role.repository';

@Injectable()
export class RoleAdapter implements RolePort {
  constructor(private readonly roleRepository: RoleRepository) {}

  async findAll(): Promise<Role[] | undefined> {
    const roles: Role[] = await this.roleRepository.find();
    return roles;
  }
  async createRole(roleName: string): Promise<number | undefined> {
    const role: Role = await this.roleRepository.create({
      role_name: RoleType[roleName],
    });
    await this.roleRepository.save(role);
    return role.identifier;
  }
  async deleteRoleByName(roleName: string): Promise<number | undefined> {
    const role: Role = await this.findRoleByName(roleName);
    await this.roleRepository.delete({ identifier: role.identifier });

    return role.identifier;
  }
  async findRoleByName(roleName: string): Promise<Role | undefined> {
    const role = await this.roleRepository.findOne({
      role_name: RoleType[roleName],
    });
    return role;
  }
}
