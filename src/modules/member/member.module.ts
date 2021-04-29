import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberController } from 'src/modules/member/infrastructure/api/member.controller';
import { MemberRepository } from 'src/modules/member/infrastructure/repository/member.repository';
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

@Module({
  imports: [
    TypeOrmModule.forFeature([MemberRepository]),
    MailModule,
    CertificationCodeModule,
  ],
  controllers: [MemberController],
  providers: [
    MemberCheckDuplicationService,
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
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RoleGuard,
    // },
  ],
  exports: [MemberVerifyService, MemberEntityService],
})
export class MemberModule {}
