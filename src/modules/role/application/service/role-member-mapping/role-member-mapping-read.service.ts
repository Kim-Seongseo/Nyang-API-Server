import { Injectable } from '@nestjs/common';
import { Role } from 'src/modules/role/domain/entity/role.entity';
import { RoleMemberMappingRepository } from '../../../infrastructure/persistence/repository/role-member-mapping.repository';

@Injectable()
export class RoleMemberMappingReadService {
  constructor(
    private roleMemberMappingRepository: RoleMemberMappingRepository,
  ) {}

  async readRole(memberIdentifier: number): Promise<number | undefined> {
    const role: Role = await (
      await this.roleMemberMappingRepository.findOne({
        member: { identifier: memberIdentifier },
      })
    ).role;

    return role.identifier;
  }
}
