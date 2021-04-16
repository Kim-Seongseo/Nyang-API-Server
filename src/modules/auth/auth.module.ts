import { Module } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/application/service/auth.service';
import { MemberModule } from 'src/modules/member/member.module';
import { LocalStrategy } from 'src/modules/auth/guard/local/local.strategy';
import { JwtStrategy } from 'src/modules/auth/guard/jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/modules/auth/infra/api/auth.controller';

@Module({
  imports: [
    MemberModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.AUTH_CONSTANTS_SECRET,
        signOptions: { expiresIn: process.env.AUTH_EXPIRES_IN },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
