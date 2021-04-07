import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberController } from 'src/modules/member/infrastructure/api/member.controller';
import { MemberService } from 'src/modules/member/application/service/member.service';
import { MemberRepository } from 'src/modules/member/infrastructure/repository/member.repository';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [MailModule, TypeOrmModule.forFeature([MemberRepository])],
  controllers: [MemberController],
  providers: [MemberService], //, { provide: APP_GUARD, useClass: JwtAuthGuard }],
  exports: [MemberService],
})
export class MemberModule {}
