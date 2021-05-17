import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MemberPort, MEMBER_PORT } from '../../domain/port/member.port';
import {
  MemberFindAccountReqDto,
  MemberFindAccountResDto,
} from '../dto/member-find-account.dto';

@Injectable()
export class MemberFindAccountService {
  constructor(@Inject(MEMBER_PORT) private readonly memberPort: MemberPort) {}

  async findAccount(
    memberFindAccountReqDto: MemberFindAccountReqDto,
  ): Promise<MemberFindAccountResDto | undefined> {
    const member: MemberFindAccountResDto = await this.memberPort.findAccount(
      memberFindAccountReqDto,
    );

    if (!member) throw new NotFoundException();
    return member;
  }
}
