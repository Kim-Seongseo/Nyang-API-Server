import { Injectable } from '@nestjs/common';
import { Member } from '../../domain/entity/member.entity';
import { MemberRepository } from '../../infrastructure/repository/member.repository';
import { MemberCreateReqDto } from '../dto/member-signIn.dto';
import { MemberCheckDuplicationService } from './member-check-duplication.service';

@Injectable()
export class MemberCreateService {
  constructor(
    private memberRepository: MemberRepository,
    private readonly memberCheckDuplicationService: MemberCheckDuplicationService,
  ) {}

  async create(
    memberCreateReqDto: MemberCreateReqDto,
  ): Promise<number | undefined> {
    await this.memberCheckDuplicationService.checkDuplication(
      memberCreateReqDto.account,
    );
    const member = await this.memberRepository.create({
      ...memberCreateReqDto,
      password: await Member.encryptToHash(memberCreateReqDto.password),
    });
    await this.memberRepository.save(member);
    return member.identifier;
  }
}
