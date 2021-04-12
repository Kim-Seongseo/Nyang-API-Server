import { Injectable, NotFoundException } from '@nestjs/common';
import { classToPlain, plainToClass } from 'class-transformer';
import { RecordState } from 'src/modules/post/domain/entity/record-state.enum';
import { MemberRepository } from '../../infrastructure/repository/member.repository';
import {
  MemberFindAccountReqDto,
  MemberFindAccountResDto,
} from '../dto/member-find-account.dto';

@Injectable()
export class MemberFindAccountService {
  constructor(private memberRepository: MemberRepository) {}

  async findAccount(
    memberFindReqDto: MemberFindAccountReqDto,
  ): Promise<MemberFindAccountResDto | undefined> {
    const result = await this.memberRepository.find({
      email: memberFindReqDto.email,
      name: memberFindReqDto.name,
      isDeleted: RecordState.NONE,
    });

    if (result.length == 0) throw new NotFoundException();
    return plainToClass(MemberFindAccountResDto, classToPlain(result));
  }
}
