import { Injectable } from '@nestjs/common';
import { classToPlain, plainToClass } from 'class-transformer';
import { UnexpectedErrorException } from 'src/modules/common/application/exception/unexpected-error-exception';
import { MemberRepository } from '../../infrastructure/repository/member.repository';
import { MemberReadResDto } from '../dto/member-read.dto';

@Injectable()
export class MemberReadService {
  constructor(private memberRepository: MemberRepository) {}

  async read(account: string): Promise<MemberReadResDto | undefined> {
    try {
      return await this.memberRepository
        .findOne({ account: account })
        .then((member) => plainToClass(MemberReadResDto, classToPlain(member))); // entity to dto
    } catch (error) {
      throw new UnexpectedErrorException();
    }
  }
}
