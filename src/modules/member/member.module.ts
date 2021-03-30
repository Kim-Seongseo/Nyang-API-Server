import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembersController } from './infra/api/member.controller';
import { MemberService } from './domain/service/member.service';
import { MemberRepository } from './infra/repository/member.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MemberRepository])],
  controllers: [MembersController],
  providers: [MemberService],
  exports: [MemberService],
})
export class MemberModule {}
