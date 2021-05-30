import { Inject, Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { ROLE_MEMBER_MAPPING_PORT } from 'src/modules/role/domain/port/port.constant';
import { RoleMemberMappingPort } from 'src/modules/role/domain/port/role-member-mapping.port';
import { RoleMemberMappingUpdateReqDto } from '../../dto/role-member-mapping-update.dto';

@Injectable()
export class RoleMemberMappingUpdateService {
  constructor(
    @Inject(ROLE_MEMBER_MAPPING_PORT)
    private readonly roleMemberMappingPort: RoleMemberMappingPort,
  ) {}

  async update(
    roleMemberMappingUpdateReqDto: RoleMemberMappingUpdateReqDto,
  ): Promise<number | undefined> {
    const identifier: number = await this.roleMemberMappingPort.updateRoleMemberMapping(
      roleMemberMappingUpdateReqDto,
    );
    if (!identifier) {
      throw new UnexpectedErrorException();
    }

    return identifier;
  }
}
