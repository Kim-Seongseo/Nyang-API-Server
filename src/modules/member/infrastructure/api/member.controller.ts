import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { MemberCreateReqDto } from 'src/modules/member/application/dto/member-signIn.dto';
import { MemberUpdateReqDto } from 'src/modules/member/application/dto/member-update.dto';
import { Public } from 'src/modules/auth/decorator/skip-auth.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  MemberFindAccountReqDto,
  MemberFindAccountResDto,
} from '../../application/dto/member-find-account.dto';
import { MemberReadResDto } from '../../application/dto/member-read.dto';
import { CertificationCodeService } from 'src/modules/certification-code/application/service/certification-code.service';
import { CertificationCodeEmailFindReqDto } from 'src/modules/certification-code/application/dto/certification-code-email-find.dto';
import { MemberFindPasswordReqDto } from '../../application/dto/member-find-password.dto';
import { MemberModifyPasswordReqDto } from '../../application/dto/member-update-password.dto';
import { MemberReadService } from '../../application/service/member-read.service';
import { MemberCreateService } from '../../application/service/member-create.service';
import { MemberUpdateService } from '../../application/service/member-update.service';
import { MemberDeleteService } from '../../application/service/member-delete.service';
import { MemberCheckDuplicationService } from '../../application/service/member-check-duplication.service';
import { MemberFindAccountService } from '../../application/service/member-find-account.service';
import { MemberFindPasswordService } from '../../application/service/member-find-password.service';
import { MemberModifyPasswordService } from '../../application/service/member-modify-password.service';
import { MemberSendCertificationCodeService } from '../../application/service/member-send-certification-code.service';
import { PermissionType } from 'src/modules/role/domain/type/permission-type.enum';
import { Permissions } from 'src/modules/role/decorator/role.decorator';

@ApiTags('회원 관리')
@Controller('member')
export class MemberController {
  constructor(
    private readonly certificationCodeService: CertificationCodeService,
    private readonly memberReadService: MemberReadService,
    private readonly memberCreateService: MemberCreateService,
    private readonly memberUpdateService: MemberUpdateService,
    private readonly memberDeleteService: MemberDeleteService,
    private readonly memberCheckDuplicationService: MemberCheckDuplicationService,
    private readonly memberFindAccountService: MemberFindAccountService,
    private readonly memberFindPasswordService: MemberFindPasswordService,
    private readonly memberModifyPasswordService: MemberModifyPasswordService,
    private readonly memberSendCertificationCodeService: MemberSendCertificationCodeService,
  ) {}

  @ApiOperation({ summary: '회원 등록' })
  @Public()
  @Post('/')
  async registerMember(
    @Body() memberCreateReqDto: MemberCreateReqDto,
  ): Promise<number | undefined> {
    // 필수 입력정보 체크 -> validator / done
    // account 중복 체크여부 -> checkDup()로 사전에 검증 / done
    // 이메일 인증 여부 -> verifyCertificationCode()로 검증
    return await this.memberCreateService.create(memberCreateReqDto);
  }

  @ApiOperation({ summary: '아이디 중복 확인' }) // done
  @Permissions(PermissionType.MEMBER_ACCESS)
  @Public()
  @Post('/duplicate')
  async checkDuplication(@Body() account: string): Promise<any | undefined> {
    await this.memberCheckDuplicationService.checkDuplication(
      account['account'],
    );
    return { message: 'Available' };
  }

  @ApiOperation({ summary: '회원 개인정보 수정' })
  @Put('/:account')
  async modifyMember(
    @Param() account: string,
    @Body() memberUpdateReqDto: MemberUpdateReqDto,
  ): Promise<any | undefined> {
    // params: dto / done
    // 필수 입력정보 검증 -> validator & optional / done
    return await this.memberUpdateService.update(
      account['account'],
      memberUpdateReqDto,
    );
  }

  @ApiOperation({ summary: '회원 탈퇴' }) // done
  @Delete('/:account')
  async removeMember(@Param() account: string): Promise<any | undefined> {
    // handle: account -> uuid4, isdeleted: true
    return await this.memberDeleteService.delete(account['account']);
  }

  @ApiOperation({ summary: '회원 개인정보 조회' }) // done
  @Get('/:account')
  async getOne(
    @Param() account: string,
  ): Promise<MemberReadResDto | undefined> {
    return await this.memberReadService.read(account['account']);
  }

  @ApiOperation({ summary: '회원 활동 조회' }) // 추후 작업
  @Post('/history/:account')
  async getHistory() {
    // need: board, question, comment, answer, page 고려하여 api분리
    return;
  }

  @ApiOperation({ summary: '계정 찾기' }) // done
  @Public()
  @Post('/find/account')
  async findAccount(
    @Body() memberFindAccountReqDto: MemberFindAccountReqDto,
  ): Promise<MemberFindAccountResDto | undefined> {
    // params: email, name
    // need: dto
    return this.memberFindAccountService.findAccount(memberFindAccountReqDto);
  }

  @ApiOperation({ summary: '비밀번호 찾기' }) // done
  @Public()
  @Post('/find/password')
  async findPassword(
    @Body() memberFindPasswordReqDto: MemberFindPasswordReqDto,
  ) {
    // params: account, email, name
    // need: dto
    // 1. 존재여부 검증
    // 2. 이메일 발송
    return this.memberFindPasswordService.findPassword(
      memberFindPasswordReqDto,
    );
  }

  @ApiOperation({ summary: '비밀번호 수정' }) // done
  @Patch('/find/password')
  async modifyPassword(
    @Body() memberModifyPasswordReqDto: MemberModifyPasswordReqDto,
  ) {
    // param: password
    return this.memberModifyPasswordService.modifyPassword(
      memberModifyPasswordReqDto,
    );
  }

  @ApiOperation({ summary: '이메일 인증번호 요청' }) // done
  @Public()
  @Get('/cert/email/:email')
  async sendCertificationCode(
    @Param() email: string,
  ): Promise<void | undefined> {
    // param: param
    return await this.memberSendCertificationCodeService.sendCertificationCode(
      email['email'],
    );
  }

  @ApiOperation({ summary: '이메일 인증번호 검증' }) // done
  @Public()
  @Post('/cert/email/')
  async verifyCertificationCode(
    @Body() certificationCodeEmailFindReqDto: CertificationCodeEmailFindReqDto,
  ) {
    // params: email, certification_code
    // need: dto
    return await this.certificationCodeService.verify(
      certificationCodeEmailFindReqDto,
    );
  }
}
