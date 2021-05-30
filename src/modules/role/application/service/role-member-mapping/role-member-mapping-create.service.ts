import { Inject, Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { Member } from 'src/modules/member/domain/entity/member.entity';
import { ROLE_MEMBER_MAPPING_PORT } from 'src/modules/role/domain/port/port.constant';
import { RoleMemberMappingPort } from 'src/modules/role/domain/port/role-member-mapping.port';
import { RoleType } from 'src/modules/role/domain/type/role-type.enum';

@Injectable()
export class RoleMemberMappingCreateService {
  constructor(
    @Inject(ROLE_MEMBER_MAPPING_PORT)
    private readonly roleMemberMappingPort: RoleMemberMappingPort,
  ) {}

  async createMemberRoleMapping(
    member: Member,
    roleName: RoleType,
  ): Promise<number | undefined> {
    const identifier: number = await this.roleMemberMappingPort.createRoleMemberMapping(
      member,
      roleName,
    );
    if (!identifier) {
      throw new UnexpectedErrorException();
    }
    return identifier;
  }
}
