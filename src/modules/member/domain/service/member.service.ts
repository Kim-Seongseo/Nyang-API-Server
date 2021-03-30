import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMemberReqDto } from 'src/modules/member/infra/dto/member-signIn.dto';
import { MemberRepository } from 'src/modules/member/infra/repository/member.repository';
import { MemberReadResDto } from 'src/modules/member/infra/dto/member-read.dto';
import { classToPlain, plainToClass } from 'class-transformer';
import { RecordState } from 'src/modules/common/domain/entity/record-state.enum';
import { UpdateMemberReqDto } from 'src/modules/member/infra/dto/member-update.dto';
import { LoginReqDto, LoginResDto } from 'src/auth/infra/dto/login.dto';
import { encryptToHash } from 'src/modules/member/domain/service/encrypt-to-hash';

@ApiTags('member')
@Injectable()
export class MemberService {
  constructor(private memberRepository: MemberRepository) {}

  @ApiOkResponse({ description: 'The record has been successfully returned.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async findOne(account: string): Promise<MemberReadResDto> {
    return await this.memberRepository
      .findOne({ account: account })
      .then((member) => plainToClass(MemberReadResDto, classToPlain(member))); // entity to dto
  }

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async create(createMemberReqDto: CreateMemberReqDto) {
    return await this.memberRepository.insert({
      ...createMemberReqDto,
      password: await encryptToHash(createMemberReqDto.password),
    });
  }

  @ApiOkResponse({ description: 'The record has been successfully removed.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async delete(account: string) {
    return await this.memberRepository.update(
      { account: account },
      { isDeleted: RecordState.DELETED },
    );
  }

  @ApiOkResponse({ description: 'The record has been successfully updated.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async update(account: string, updateMemberReqDto: UpdateMemberReqDto) {
    return await this.memberRepository.update(
      { account: account },
      { ...updateMemberReqDto },
    );
  }

  @ApiOkResponse({ description: 'The record has been successfully updated.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async verify(loginReqDto: LoginReqDto): Promise<LoginResDto> {
    const result = await this.memberRepository.findOne({
      account: loginReqDto.account,
    });
    const cryptogram = await encryptToHash(result.password);
    if (!result.comparePassword(cryptogram)) return null;
    return plainToClass(LoginResDto, classToPlain(result));
  }
}
