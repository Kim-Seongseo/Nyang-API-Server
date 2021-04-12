import { Injectable } from '@nestjs/common';
import { MemberRepository } from '../../infrastructure/repository/member.repository';
import { DuplicatedAccountException } from '../exception/duplicated-account.exception';

@Injectable()
export class MemberCheckDuplicationService {
  constructor(private memberRepository: MemberRepository) {}

  async checkDuplication(account: string): Promise<void | undefined> {
    const result = await this.memberRepository.find({
      account: account,
    });
    if (result.length > 0) throw new DuplicatedAccountException();
  }
}
