import { Inject, Injectable } from '@nestjs/common';
import { NotExistException } from 'src/modules/answer/application/exception/not-exist.exception';
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
    const member: Member = await this.memberPort.findMemberByAccount(
      memberModifyPasswordReqDto.account,
    );
    if (!member) {
      throw new NotExistException();
    }

    member.password = await Member.encryptToHash(
      memberModifyPasswordReqDto.password,
    );
    const memberIdentifier: number = await this.memberPort.saveMember(member);
    if (!memberIdentifier) {
      throw new UnexpectedErrorException();
    }

    return memberIdentifier;
  }
}
