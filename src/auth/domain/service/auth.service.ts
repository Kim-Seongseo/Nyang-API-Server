import { Injectable } from '@nestjs/common';
import { MemberService } from '../../../member/domain/service/member.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private memberService: MemberService,
    private jwtService: JwtService,
  ) {}

  async validateUser(id: string, password: string): Promise<any> {
    const member = await this.memberService.findOne(id);
    if (member && member.password === password) {
      const { password, ...result } = member;
      return result;
    }
    return null;
  }

  async login(member: any) {
    console.log(member.id);
    console.log(member.identifier);
    const payload = { id: member.id, sub: member.identifier };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
