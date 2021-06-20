import { Injectable } from '@nestjs/common';
import { Member } from 'src/modules/member/domain/entity/member.entity';
import { RecordState } from 'src/modules/post/domain/entity/record-state.enum';
import { RoleMemberMappingFindResDto } from '../../application/dto/role-member-mapping-find.dto';
import { RoleMemberMappingUpdateReqDto } from '../../application/dto/role-member-mapping-update.dto';
import { RoleMemberMapping } from '../../domain/entity/role-member-mapping.entity';
import { Role } from '../../domain/entity/role.entity';
import { RoleMemberMappingPort } from '../../domain/port/role-member-mapping.port';
import { RoleType } from '../../domain/type/role-type.enum';
import { RoleMemberMappingQueryRepository } from './repository/role-member-mapping-query-repository';
import { RoleMemberMappingRepository } from './repository/role-member-mapping.repository';
import { RoleRepository } from './repository/role.repository';

@Injectable()
export class RoleMemberMappingAdapter implements RoleMemberMappingPort {
  constructor(
    private readonly roleMemberMappingRepository: RoleMemberMappingRepository,
    private readonly roleMemberMappingQueryRepository: RoleMemberMappingQueryRepository,
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

  async updateRoleMemberMapping(
    roleMemberMappingUpdateReqDto: RoleMemberMappingUpdateReqDto,
  ): Promise<number | undefined> {
    const type: RoleType = RoleType[roleMemberMappingUpdateReqDto.Role];

    const role: Role = await this.roleRepository.findOne({ role_name: type });
    await this.roleMemberMappingRepository.update(
      { identifier: roleMemberMappingUpdateReqDto.identifier },
      { role },
    );
    return roleMemberMappingUpdateReqDto.identifier;
  }

  async findRoleByIdentifier(identifier: number): Promise<Role | undefined> {
    const role: Role = await (
      await this.roleMemberMappingRepository.findOne({
        member: { identifier },
      })
    ).role;
    return role;
  }

  async findPaginatedRoleMemberMappingByKeyword(
    skippedItems: number,
    perPage: number,
    keyword: string,
  ): Promise<RoleMemberMappingFindResDto[] | undefined> {
    const roleMemberMappings: RoleMemberMappingFindResDto[] = await this.roleMemberMappingQueryRepository.findPaginatedRoleMemberMappingByKeyword(
      skippedItems,
      perPage,
      keyword,
    );
    return roleMemberMappings;
  }

  async countQuestion(): Promise<number | undefined> {
    return await this.roleMemberMappingQueryRepository.countQuestion();
  }
}
