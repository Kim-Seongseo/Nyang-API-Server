import { Inject, Injectable } from '@nestjs/common';
import { RoleMemberMappingCreateService } from 'src/modules/role/application/service/role-member-mapping/role-member-mapping-create.service';
import { RoleType } from 'src/modules/role/domain/type/role-type.enum';
import { Member } from '../../domain/entity/member.entity';
import { MemberPort, MEMBER_PORT } from '../../domain/port/member.port';
import { MemberCreateReqDto } from '../dto/member-signIn.dto';
import { MemberCheckDuplicationService } from './member-check-duplication.service';

@Injectable()
export class MemberCreateService {
  constructor(
    @Inject(MEMBER_PORT) private readonly memberPort: MemberPort,
    private readonly memberCheckDuplicationService: MemberCheckDuplicationService,
    private readonly roleMemberMappingCreateService: RoleMemberMappingCreateService,
  ) {}

  async create(
    memberCreateReqDto: MemberCreateReqDto,
  ): Promise<number | undefined> {
    await this.memberCheckDuplicationService.checkDuplication(
      memberCreateReqDto.account,
    );

    const member: Member = await this.memberPort.createMember(
      memberCreateReqDto,
      await Member.encryptToHash(memberCreateReqDto.password),
    );

    // role - member
    await this.roleMemberMappingCreateService.createMemberRoleMapping(
      member,
      RoleType.MEMBER,
    );
    return member.identifier;
  }
}
