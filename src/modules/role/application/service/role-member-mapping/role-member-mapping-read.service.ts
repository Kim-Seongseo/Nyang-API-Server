import { Inject, Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { Role } from 'src/modules/role/domain/entity/role.entity';
import { ROLE_MEMBER_MAPPING_PORT } from 'src/modules/role/domain/port/port.constant';
import { RoleMemberMappingPort } from 'src/modules/role/domain/port/role-member-mapping.port';

@Injectable()
export class RoleMemberMappingReadService {
  constructor(
    @Inject(ROLE_MEMBER_MAPPING_PORT)
    private roleMemberMappingPort: RoleMemberMappingPort,
  ) {}

  async readRole(memberIdentifier: number): Promise<number | undefined> {
    const role: Role = await this.roleMemberMappingPort.findRoleByIdentifier(
      memberIdentifier,
    );
    if (!role) {
      throw new UnexpectedErrorException();
    }
    return role.identifier;
  }
}
