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
import { CreateMemberReqDto } from 'src/modules/member/application/dto/member-signIn.dto';
import { UpdateMemberReqDto } from 'src/modules/member/application/dto/member-update.dto';
import { MemberService } from 'src/modules/member/application/service/member.service';
import { Public } from 'src/auth/decorator/skip-auth.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  MemberFindReqDto,
  MemberFindResDto,
} from '../../application/dto/member-find.dto';
import { MemberReadResDto } from '../../application/dto/member-read.dto';
import { MailService } from 'src/modules/mail/application/service/mail.service';

@ApiTags('회원 관리')
@Controller('member')
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly mailService: MailService,
  ) {}

  @ApiOperation({ summary: '회원 등록' })
  @Public()
  @Post('/')
  async registerMember(
    @Body() createMemberReqDto: CreateMemberReqDto,
  ): Promise<Long | undefined> {
    // 필수 입력정보 체크 -> validator / done
    // account 중복 체크여부 -> checkDup()로 사전에 검증 / done
    // 이메일 인증 여부 -> verifyCertificationCode()로 검증
    return await this.memberService.create(createMemberReqDto);
  }

  @ApiOperation({ summary: '아이디 중복 확인' }) // done
  @Post('/duplicate')
  async checkDuplication(@Body() account: string): Promise<any | undefined> {
    await this.memberService.checkDup(account['account']);
    return { message: 'Available' };
  }

  @ApiOperation({ summary: '회원 개인정보 수정' })
  @Put('/:account')
  async modifyMember(
    @Param() account: string,
    @Body() updateMemberReqDto: UpdateMemberReqDto,
  ): Promise<any | undefined> {
    // params: dto / done
    // 필수 입력정보 검증 -> validator & optional / done
    return await this.memberService.update(
      account['account'],
      updateMemberReqDto,
    );
  }

  @ApiOperation({ summary: '회원 탈퇴' }) // done
  @Delete('/:account')
  async removeMember(@Param() account: string): Promise<any | undefined> {
    // handle: account -> uuid4, isdeleted: true
    return await this.memberService.delete(account);
  }

  @ApiOperation({ summary: '회원 개인정보 조회' }) // done
  @Get('/:account')
  async getOne(
    @Param() account: string,
  ): Promise<MemberReadResDto | undefined> {
    return await this.memberService.findOne(account);
  }

  @ApiOperation({ summary: '회원 활동 조회' }) // 추후 작업
  @Post('/duplicate')
  async getHistory() {
    // need: board, question, comment, answer, page 고려하여 api분리
    return;
  }

  @ApiOperation({ summary: '계정 찾기' }) // done
  @Public()
  @Post('/find/account')
  async findAccount(
    @Body() memberFindReqDto: MemberFindReqDto,
  ): Promise<MemberFindResDto | undefined> {
    // params: email, name
    // need: dto
    return this.memberService.findAccount(memberFindReqDto);
  }

  @ApiOperation({ summary: '비밀번호 찾기' })
  @Public()
  @Post('/find/password')
  async findPassword(@Body() password: string) {
    // params: account, password
    // need: dto
    return;
  }

  @ApiOperation({ summary: '비밀번호 수정' })
  @Public()
  @Patch('/find/password')
  async modifyPassword(@Body() body: any) {
    // param: password
    return;
  }

  @ApiOperation({ summary: '이메일 인증번호 요청' })
  @Get('/cert/email')
  async sendCertificationCode() {
    // param: param
    return this.mailService.example2();
    return;
  }

  @ApiOperation({ summary: '이메일 인증번호 검증' })
  @Post('/cert/email')
  async verifyCertificationCode() {
    // params: email, certification_code
    // need: dto
    return;
  }
}
