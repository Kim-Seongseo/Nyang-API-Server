import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/modules/auth/guard/local/local-auth.guard';
import { AuthService } from 'src/modules/auth/application/service/auth.service';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt/jwt-auth.guard';
import { Public } from '../../decorator/skip-auth.decorator';

@ApiTags('로그인 관리')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('/login')
  async login(@Request() req) {
    return await this.authService.createAccessToken({
      identifier: req.user['identifier'],
      account: req.user['account'],
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout() {
    return 'ok';
  }
}
