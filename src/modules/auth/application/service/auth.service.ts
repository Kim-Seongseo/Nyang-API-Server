import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  LoginReqDto,
  LoginResDto,
} from 'src/modules/auth/application/dto/login.dto';
import { MemberVerifyService } from 'src/modules/member/application/service/member-verify.service';

@Injectable()
export class AuthService {
  constructor(
    private memberVerifyService: MemberVerifyService,
    private jwtService: JwtService,
  ) {}

  async validateMember(loginReqDto: LoginReqDto): Promise<LoginResDto> {
    const memberInfo: LoginResDto = await this.memberVerifyService.verify(
      loginReqDto,
    );
    if (!memberInfo) throw new UnauthorizedException();
    return memberInfo;
  }

  async createAccessToken(payload: Record<string, any>): Promise<string> {
    console.log(payload);
    return await this.jwtService.sign(payload);
  }
}
