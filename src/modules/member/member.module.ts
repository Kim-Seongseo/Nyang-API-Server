import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberController } from 'src/modules/member/infrastructure/api/member.controller';
import { MemberRepository } from 'src/modules/member/infrastructure/persistence/repository/member.repository';
import { MailModule } from '../mail/mail.module';
import { CertificationCodeModule } from '../certification-code/certification-code.module';
import { MemberCheckDuplicationService } from './application/service/member-check-duplication.service';
import { MemberCreateService } from './application/service/member-create.service';
import { MemberDeleteService } from './application/service/member-delete.service';
import { MemberFindAccountService } from './application/service/member-find-account.service';
import { MemberFindPasswordService } from './application/service/member-find-password.service';
import { MemberModifyPasswordService } from './application/service/member-modify-password.service';
import { MemberReadService } from './application/service/member-read.service';
import { MemberSendCertificationCodeService } from './application/service/member-send-certification-code.service';
import { MemberUpdateService } from './application/service/member-update.service';
import { MemberVerifyService } from './application/service/member-verify.service';
import { MemberEntityService } from './application/service/member-entity.service';
import { ResponseModule } from '../response/response.module';
import { MEMBER_PORT } from './domain/port/member.port';
import { MemberAdapter } from './infrastructure/persistence/member.adapter';
import { RoleModule } from '../role/role.module';
import { FileModule } from '../file/file.module';
import { MemberQueryRepository } from './infrastructure/persistence/repository/member-query-repository';
import { MemberReadRoleNameService } from './application/service/member-read-role-name.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MemberRepository]),
    TypeOrmModule.forFeature([MemberQueryRepository]),
    MailModule,
    CertificationCodeModule,
    ResponseModule,
    forwardRef(() => RoleModule),
    FileModule,
  ],
  controllers: [MemberController],
  providers: [
    MemberCheckDuplicationService,
    MemberReadRoleNameService,
    MemberCreateService,
    MemberDeleteService,
    MemberFindAccountService,
    MemberFindPasswordService,
    MemberModifyPasswordService,
    MemberReadService,
    MemberSendCertificationCodeService,
    MemberUpdateService,
    MemberVerifyService,
    MemberEntityService,
    {
      provide: MEMBER_PORT,
      useClass: MemberAdapter,
    },
  ],
  exports: [
    MemberVerifyService,
    MemberEntityService,
    MemberReadRoleNameService,
  ],
})
export class MemberModule {}
