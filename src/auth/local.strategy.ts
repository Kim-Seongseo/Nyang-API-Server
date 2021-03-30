import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/domain/service/auth.service';
import { LoginResDto } from 'src/auth/infra/dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'account', passwordField: 'password' });
  }

  async validate(account: string, password: string): Promise<LoginResDto> {
    const loginResDto = await this.authService.validateMember({
      account,
      password,
    });

    if (!loginResDto) throw new UnauthorizedException();
    return loginResDto;
  }
}
