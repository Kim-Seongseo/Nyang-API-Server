import { Injectable, NotFoundException } from '@nestjs/common';
import { MemberRepository } from '../../infrastructure/repository/member.repository';
import { MemberFindPasswordReqDto } from '../dto/member-find-password.dto';

@Injectable()
export class MemberFindPasswordService {
  constructor(private memberRepository: MemberRepository) {}

  async findPassword(
    memberFindPasswordReqDto: MemberFindPasswordReqDto,
  ): Promise<number | undefined> {
    const result = await this.memberRepository.findOne({
      account: memberFindPasswordReqDto.account,
      email: memberFindPasswordReqDto.email,
      name: memberFindPasswordReqDto.name,
    });
    if (!result) throw new NotFoundException();
    // await this.sendCertificationCode(memberFindPasswordReqDto.email);
    return result.identifier;
  }
}
