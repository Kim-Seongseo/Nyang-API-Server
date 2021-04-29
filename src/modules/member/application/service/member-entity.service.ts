import { Injectable } from '@nestjs/common';
import { Member } from '../../domain/entity/member.entity';
import { MemberRepository } from '../../infrastructure/repository/member.repository';

@Injectable()
export class MemberEntityService {
  constructor(private memberRepository: MemberRepository) {}

  async getEntity(account: string): Promise<Member | undefined> {
    return await this.memberRepository.findOne({ account: account });
  }
}
