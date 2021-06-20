import { Member } from 'src/modules/member/domain/entity/member.entity';
import { RoleMemberMappingFindResDto } from '../../application/dto/role-member-mapping-find.dto';
import { RoleMemberMappingUpdateReqDto } from '../../application/dto/role-member-mapping-update.dto';
import { Role } from '../entity/role.entity';
import { RoleType } from '../type/role-type.enum';

export interface RoleMemberMappingPort {
  createRoleMemberMapping(
    memberIdentifier: Member,
    roleName: string,
  ): Promise<number | undefined>;

  updateRoleMemberMapping(
    roleMemberMappingUpdateReqDto: RoleMemberMappingUpdateReqDto,
  ): Promise<number | undefined>;

  findRoleByIdentifier(identifier: number): Promise<Role | undefined>;

  findPaginatedRoleMemberMappingByKeyword(
    skippedItems: number,
    perPage: number,
    keyword: string,
  ): Promise<RoleMemberMappingFindResDto[] | undefined>;

  countQuestion(): Promise<number | undefined>;
}
