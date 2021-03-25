import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './domain/service/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(id: string, password: string): Promise<any> {
    const member = await this.authService.validateUser(id, password);
    if (!member) {
      throw new UnauthorizedException();
    }
    return member;
  }
}
