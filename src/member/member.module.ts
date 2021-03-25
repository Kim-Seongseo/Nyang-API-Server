import { Module } from '@nestjs/common';
import { MembersController } from './infra/api/member.controller';
import { MemberService } from './domain/service/member.service';

@Module({
  controllers: [MembersController],
  providers: [MemberService],
  exports: [MemberService],
})
export class MemberModule {}
