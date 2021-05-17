import { Inject, Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { Member } from '../../domain/entity/member.entity';
import { MemberPort, MEMBER_PORT } from '../../domain/port/member.port';
import { MemberModifyPasswordReqDto } from '../dto/member-update-password.dto';

@Injectable()
export class MemberModifyPasswordService {
  constructor(@Inject(MEMBER_PORT) private readonly memberPort: MemberPort) {}

  async modifyPassword(
    memberModifyPasswordReqDto: MemberModifyPasswordReqDto,
  ): Promise<number | undefined> {
    try {
      const member: Member = await this.memberPort.findMemberByAccount(
        memberModifyPasswordReqDto.account,
      );
      member.password = await Member.encryptToHash(
        memberModifyPasswordReqDto.password,
      );
      const memberIdentifier: number = await this.memberPort.saveMember(member);
      return memberIdentifier;
    } catch (error) {
      throw new UnexpectedErrorException();
    }
  }
}
