import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { MemberRepository } from '../../infrastructure/repository/member.repository';
import { MemberUpdateReqDto } from '../dto/member-update.dto';

@Injectable()
export class MemberUpdateService {
  constructor(private memberRepository: MemberRepository) {}

  async update(
    account: string,
    memberUpdateReqDto: MemberUpdateReqDto,
  ): Promise<any | undefined> {
    // await this.checkDuplication(account);
    try {
      await this.memberRepository.update(
        { account: account },
        { ...memberUpdateReqDto },
      );
      return { message: 'account is successfully modified.' };
    } catch (error) {
      throw new RequestTimeoutException();
    }
  }
}
