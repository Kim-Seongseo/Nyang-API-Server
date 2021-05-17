import { Member } from 'src/modules/member/domain/entity/member.entity';
import { Role } from '../entity/role.entity';
import { RoleType } from '../type/role-type.enum';

export interface RoleMemberMappingPort {
  findRoleByIdentifier(identifier: number): Promise<Role | undefined>;
  createRoleMemberMapping(
    memberIdentifier: Member,
    roleName: string,
  ): Promise<number | undefined>;
}
