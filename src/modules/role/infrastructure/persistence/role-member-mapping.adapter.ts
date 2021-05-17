import { Injectable } from '@nestjs/common';
import { Member } from 'src/modules/member/domain/entity/member.entity';
import { RoleMemberMapping } from '../../domain/entity/role-member-mapping.entity';
import { Role } from '../../domain/entity/role.entity';
import { RoleMemberMappingPort } from '../../domain/port/role-member-mapping.port';
import { RoleType } from '../../domain/type/role-type.enum';
import { RoleMemberMappingRepository } from './repository/role-member-mapping.repository';
import { RoleRepository } from './repository/role.repository';

@Injectable()
export class RoleMemberMappingAdapter implements RoleMemberMappingPort {
  constructor(
    private readonly roleMemberMappingRepository: RoleMemberMappingRepository,
    private readonly roleRepository: RoleRepository,
  ) {}
  async createRoleMemberMapping(
    member: Member,
    roleName: RoleType,
  ): Promise<number | undefined> {
    try {
      const role: Role = await this.roleRepository.findOne({
        role_name: roleName,
      });

      const roleMemberMapping: RoleMemberMapping = await this.roleMemberMappingRepository.create(
        {
          member,
          role,
        },
      );
      await this.roleMemberMappingRepository.save(roleMemberMapping);
      return roleMemberMapping.identifier;
    } catch (error) {
      console.log(error);
    }
  }

  async findRoleByIdentifier(identifier: number): Promise<Role | undefined> {
    const role: Role = await (
      await this.roleMemberMappingRepository.findOne({
        member: { identifier },
      })
    ).role;
    return role;
  }
}
