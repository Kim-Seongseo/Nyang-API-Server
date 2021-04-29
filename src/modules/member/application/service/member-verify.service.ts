import { Injectable } from '@nestjs/common';
import { classToPlain, plainToClass } from 'class-transformer';
import {
  LoginReqDto,
  LoginResDto,
} from 'src/modules/auth/application/dto/login.dto';
import { Member } from '../../domain/entity/member.entity';
import { MemberRepository } from '../../infrastructure/repository/member.repository';

@Injectable()
export class MemberVerifyService {
  constructor(private memberRepository: MemberRepository) {}

  async verify(loginReqDto: LoginReqDto): Promise<LoginResDto | undefined> {
    const result = await this.memberRepository.findOne({
      account: loginReqDto.account,
    });
    console.log(result);
    const cryptogram = await Member.encryptToHash(result.password);
    if (!result.comparePassword(cryptogram)) return null;
    return plainToClass(LoginResDto, classToPlain(result));
  }
}
