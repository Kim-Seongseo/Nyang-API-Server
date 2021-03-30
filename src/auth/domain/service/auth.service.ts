import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MemberService } from 'src/modules/member/domain/service/member.service';
import { JwtService } from '@nestjs/jwt';
import { LoginReqDto, LoginResDto } from 'src/auth/infra/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private memberService: MemberService,
    private jwtService: JwtService,
  ) {}

  async validateMember(loginReqDto: LoginReqDto): Promise<LoginResDto> {
    const memberInfo = await this.memberService.verify(loginReqDto);

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
