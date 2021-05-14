import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { MemberCreateReqDto } from 'src/modules/member/application/dto/member-signIn.dto';
import { MemberUpdateReqDto } from 'src/modules/member/application/dto/member-update.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
import { ResponseService } from 'src/modules/response/application/service/response.service';
import { Response } from 'src/modules/response/application/domain/response.interface';
import { ExceptionInterceptor } from 'src/modules/common/interceptor/exception.interceptor';
import { MemberIdentifier } from '../../decorator/member-identifier.decorator';

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
    private readonly responseService: ResponseService,
  ) {}

  @ApiOperation({ summary: '회원 등록' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
    schema: { type: 'object', properties: { identifier: { type: 'string' } } },
  })
  @Permissions()
  @Post('/')
  async registerMember(
    @Body() memberCreateReqDto: MemberCreateReqDto,
  ): Promise<Response | undefined> {
    // 필수 입력정보 체크 -> validator / done
    // account 중복 체크여부 -> checkDup()로 사전에 검증 / done
    // 이메일 인증 여부 -> verifyCertificationCode()로 검증
    try {
      const identifier: string = (
        await this.memberCreateService.create(memberCreateReqDto)
      ).toString();

      return this.responseService.success(
        '계정을 성공적으로 생성하였습니다.',
        HttpStatus.CREATED,
        { identifier },
      );
    } catch (error) {
      console.log(error);
      return this.responseService.error(error.response, error.status);
    }
  }

  @ApiOperation({ summary: '회원 개인정보 수정' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
    schema: { type: 'object', properties: { identifier: { type: 'string' } } },
  })
  @ApiBearerAuth('token')
  @Permissions(PermissionType.MEMBER_ACCESS)
  @Put('/')
  async modifyMember(
    @MemberIdentifier() memberIdentifier: number,
    @Body() memberUpdateReqDto: MemberUpdateReqDto,
  ): Promise<any | undefined> {
    // params: dto / done
    // 필수 입력정보 검증 -> validator & optional / done
    try {
      const identifier: string = await this.memberUpdateService.update(
        memberIdentifier,
        memberUpdateReqDto,
      );
      return this.responseService.success(
        '계정이 성공적으로 수정되었습니다.',
        HttpStatus.OK,
        { identifier },
      );
    } catch (error) {
      console.log(error);
      return this.responseService.error(error.response, error.status);
    }
  }

  @ApiOperation({ summary: '회원 탈퇴' }) // done
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
    schema: { type: 'object', properties: { identifier: { type: 'string' } } },
  })
  @ApiBearerAuth('token')
  @Permissions(PermissionType.MEMBER_ACCESS)
  @Delete('/')
  async removeMember(
    @MemberIdentifier() memberIdentifier: number,
  ): Promise<any | undefined> {
    // handle: account -> uuid4, isdeleted: true
    try {
      const identifier: string = await this.memberDeleteService
        .delete(memberIdentifier)
        .toString();
      return this.responseService.success(
        '계정이 성공적으로 삭제되었습니다.',
        HttpStatus.OK,
        { identifier },
      );
    } catch (error) {
      return this.responseService.error(error.response, error.status);
    }
  }

  @ApiOperation({ summary: '회원 개인정보 조회' }) // done
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
    type: [MemberReadResDto],
  })
  @ApiBearerAuth('token')
  @Permissions(PermissionType.MEMBER_ACCESS)
  @Get('/')
  async getOne(
    @MemberIdentifier() memberIdentifier: number,
  ): Promise<Response | undefined> {
    try {
      const memberInfo: MemberReadResDto = await this.memberReadService.read(
        memberIdentifier,
      );
      return this.responseService.success(
        '계정이 성공적으로 조회되었습니다.',
        HttpStatus.OK,
        { memberInfo },
      );
    } catch (error) {
      return this.responseService.error(error.response, error.status);
    }
  }

  @ApiOperation({ summary: '아이디 중복 확인' }) // done
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        account: {
          type: 'string',
        },
      },
    },
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
  })
  @Permissions()
  @Post('/duplicate')
  async checkDuplication(
    @Body('account') account: string,
  ): Promise<Response | undefined> {
    try {
      await this.memberCheckDuplicationService.checkDuplication(account);
      return this.responseService.success(
        '사용가능한 계정입니다.',
        HttpStatus.CREATED,
      );
    } catch (error) {
      console.log(error);
      return this.responseService.error(error.response, error.status);
    }
  }

  @ApiOperation({ summary: '회원 활동 조회' }) // 추후 작업
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
    // schema: { type: 'object', properties: { identifier: { type: 'string' } } },
  })
  @ApiBearerAuth('token')
  @Permissions(PermissionType.MEMBER_ACCESS)
  @Post('/history')
  async getHistory(@MemberIdentifier() memberIdentifier) {
    // need: board, question, comment, answer, page 고려하여 api분리
    return;
  }

  @ApiOperation({ summary: '계정 찾기' }) // done
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
    type: [MemberFindAccountResDto],
  })
  @Permissions()
  @Post('/find/account')
  async findAccount(
    @Body() memberFindAccountReqDto: MemberFindAccountReqDto,
  ): Promise<Response | undefined> {
    // params: email, name
    // need: dto
    try {
      const memberInfo: MemberFindAccountResDto = await this.memberFindAccountService.findAccount(
        memberFindAccountReqDto,
      );
      return this.responseService.success(
        '계정을 성공적으로 조회했습니다.',
        HttpStatus.CREATED,
        { memberInfo },
      );
    } catch (error) {
      return this.responseService.error(error.response, error.status);
    }
  }

  @ApiOperation({ summary: '비밀번호 찾기' }) // done
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
    schema: { type: 'object', properties: { identifier: { type: 'string' } } },
  })
  @Permissions()
  @Post('/find/password')
  async findPassword(
    @Body() memberFindPasswordReqDto: MemberFindPasswordReqDto,
  ): Promise<Response | undefined> {
    // params: account, email, name
    // need: dto
    // 1. 존재여부 검증
    // 2. 이메일 발송
    try {
      const identifier: string = await this.memberFindPasswordService
        .findPassword(memberFindPasswordReqDto)
        .toString();
      return this.responseService.success(
        '비밀번호 찾기를 위한 이메일이 발송되었습니다.',
        HttpStatus.CREATED,
        { identifier },
      );
    } catch (error) {
      return this.responseService.error(error.response, error.status);
    }
  }

  @ApiOperation({ summary: '비밀번호 수정' }) // done
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
    schema: { type: 'object', properties: { identifier: { type: 'string' } } },
  })
  @ApiBearerAuth('token')
  @Permissions(PermissionType.MEMBER_ACCESS)
  @Patch('/find/password')
  async modifyPassword(
    @Body() memberModifyPasswordReqDto: MemberModifyPasswordReqDto,
  ): Promise<Response | undefined> {
    // param: password
    try {
      const identifier: string = await this.memberModifyPasswordService
        .modifyPassword(memberModifyPasswordReqDto)
        .toString();
      return this.responseService.success(
        '비밀번호가 성공적으로 수정되었습니다.',
        HttpStatus.OK,
        { identifier },
      );
    } catch (error) {
      return this.responseService.error(error.response, error.status);
    }
  }

  @ApiOperation({ summary: '이메일 인증번호 요청' }) // done
  @ApiParam({
    name: 'email',
    type: 'string',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
  })
  @Permissions()
  @Get('/cert/email/:email')
  async sendCertificationCode(
    @Param() email: string,
  ): Promise<Response | undefined> {
    // param: param
    try {
      await this.memberSendCertificationCodeService.sendCertificationCode(
        email['email'],
      );
      return this.responseService.success(
        '성공적으로 이메일이 발송되었습니다.',
        HttpStatus.OK,
      );
    } catch (error) {}
  }

  @ApiOperation({
    summary: '이메일 인증번호 검증',
    description: 'type의 default는 email',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
    schema: { type: 'object', properties: { identifier: { type: 'string' } } },
  })
  @Permissions()
  @Post('/cert/email/')
  async verifyCertificationCode(
    @Body() certificationCodeEmailFindReqDto: CertificationCodeEmailFindReqDto,
  ): Promise<Response | undefined> {
    // params: email, certification_code
    // need: dto
    try {
      const identifier: string = (
        await this.certificationCodeService.verify(
          certificationCodeEmailFindReqDto,
        )
      ).toString();
      return this.responseService.success(
        '이메일 인증이 완료되었습니다.',
        HttpStatus.CREATED,
        { identifier },
      );
    } catch (error) {
      console.log(error);
      return this.responseService.error(error.response, error.status);
    }
  }
}
