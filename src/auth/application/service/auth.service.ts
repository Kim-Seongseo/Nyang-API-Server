import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginReqDto, LoginResDto } from 'src/auth/application/dto/login.dto';
import { MemberVerifyService } from 'src/modules/member/application/service/member-verify.service';

@Injectable()
export class AuthService {
  constructor(
    private memberVerifyService: MemberVerifyService,
    private jwtService: JwtService,
  ) {}

  async validateMember(loginReqDto: LoginReqDto): Promise<LoginResDto> {
    const memberInfo = await this.memberVerifyService.verify(loginReqDto);

    if (!memberInfo) throw new UnauthorizedException();
    return memberInfo;
  }

  async login(loginResDto: LoginResDto): Promise<any> {
    const payload = { account: loginResDto.account, name: loginResDto.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
