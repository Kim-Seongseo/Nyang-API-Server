import { Inject, Injectable } from '@nestjs/common';
import { ROLE_MEMBER_MAPPING_PORT } from 'src/modules/role/domain/port/port.constant';
import { RoleMemberMappingPort } from 'src/modules/role/domain/port/role-member-mapping.port';

@Injectable()
export class RoleMemberMappingUtilService {
  constructor(
    @Inject(ROLE_MEMBER_MAPPING_PORT)
    private readonly roleMemberMappingPort: RoleMemberMappingPort,
  ) {}

  async skip(page: number, perPage: number): Promise<number | undefined> {
    return (page - 1) * perPage;
  }

  async totalData(): Promise<number | undefined> {
    return await this.roleMemberMappingPort.countQuestion();
  }

  async totalPage(
    totalData: number,
    perPage: number,
  ): Promise<number | undefined> {
    return Math.ceil(totalData / perPage);
  }
}
