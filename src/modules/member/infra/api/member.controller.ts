import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateMemberReqDto } from 'src/modules/member/infra/dto/member-signIn.dto';
import { UpdateMemberReqDto } from 'src/modules/member/infra/dto/member-update.dto';
import { MemberService } from 'src/modules/member/domain/service/member.service';

@Controller('members')
export class MembersController {
  constructor(private readonly memberService: MemberService) {}

  @Get('/:identifier')
  async getOne(@Param() account: string) {
    return await this.memberService.findOne(account);
  }

  @Post('/') // 계정 생성
  async registerMember(@Body() createMemberReqDto: CreateMemberReqDto) {
    return await this.memberService.create(createMemberReqDto);
  }

  @Delete('/:account') // 계정 삭제
  async removeMember(@Param() account: string) {
    return await this.memberService.delete(account);
  }

  @Put('/:account') // 계정정보 변경
  async modifyMember(
    @Param() account: string,
    @Body() updateMemberReqDto: UpdateMemberReqDto,
  ) {
    return await this.memberService.update(account, updateMemberReqDto);
  }
}
