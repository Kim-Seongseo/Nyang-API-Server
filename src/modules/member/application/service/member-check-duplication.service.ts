import { Inject, Injectable } from '@nestjs/common';
import { MemberPort, MEMBER_PORT } from '../../domain/port/member.port';
import { DuplicatedAccountException } from '../exception/duplicated-account.exception';

@Injectable()
export class MemberCheckDuplicationService {
  constructor(@Inject(MEMBER_PORT) private readonly memberPort: MemberPort) {}

  async checkDuplication(account: string): Promise<void | undefined> {
    const count: number = await this.memberPort.countMemberByAccount(account);
    if (count > 0) {
      throw new DuplicatedAccountException();
    }
  }
}
