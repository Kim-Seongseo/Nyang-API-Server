import { Inject, Injectable } from '@nestjs/common';
import { classToPlain, plainToClass } from 'class-transformer';
import {
  LoginReqDto,
  LoginResDto,
} from 'src/modules/auth/application/dto/login.dto';
import { Member } from '../../domain/entity/member.entity';
import { MemberPort, MEMBER_PORT } from '../../domain/port/member.port';
import { MemberRepository } from '../../infrastructure/persistence/repository/member.repository';

@Injectable()
export class MemberVerifyService {
  constructor(@Inject(MEMBER_PORT) private readonly memberPort: MemberPort) {}

  async verify(loginReqDto: LoginReqDto): Promise<LoginResDto | undefined> {
    const member: Member = await this.memberPort.findMemberByAccount(
      loginReqDto.account,
    );

    const cryptogram = await Member.encryptToHash(member.password);
    if (!member.comparePassword(cryptogram)) {
      return null;
    }
    return plainToClass(LoginResDto, classToPlain(member));
  }
}
