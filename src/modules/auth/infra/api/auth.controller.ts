import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/modules/auth/guard/local/local-auth.guard';
import { AuthService } from 'src/modules/auth/application/service/auth.service';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt/jwt-auth.guard';

@ApiTags('로그인 관리')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout() {
    return 'ok';
  }
}
