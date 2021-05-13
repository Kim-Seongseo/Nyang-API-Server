import { Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { Member } from '../../domain/entity/member.entity';
import { MemberRepository } from '../../infrastructure/repository/member.repository';
import { MemberModifyPasswordReqDto } from '../dto/member-update-password.dto';

@Injectable()
export class MemberModifyPasswordService {
  constructor(private memberRepository: MemberRepository) {}

  async modifyPassword(
    memberModifyPasswordReqDto: MemberModifyPasswordReqDto,
  ): Promise<number | undefined> {
    try {
      const member = await this.memberRepository.findOne({
        account: memberModifyPasswordReqDto.account,
      });
      member.password = await Member.encryptToHash(
        memberModifyPasswordReqDto.password,
      );
      await this.memberRepository.save(member);
      return member.identifier;
    } catch (error) {
      throw new UnexpectedErrorException();
    }
  }
}
