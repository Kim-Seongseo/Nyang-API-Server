import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Controller, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MemberIdentifier } from 'src/modules/member/decorator/member-identifier.decorator';
import { ResponseService } from 'src/modules/response/application/service/response.service';
import { Response } from 'src/modules/response/application/domain/response.interface';
import { Permissions } from 'src/modules/role/decorator/role.decorator';
import { PermissionType } from 'src/modules/role/domain/type/permission-type.enum';
import { AnswerCreateReqDto } from '../../application/dto/answer-create.dto';
import { AnswerFindResDto } from '../../application/dto/answer-find.dto';
import { AnswerUpdateReqDto } from '../../application/dto/answer-update.dto';
import { AnswerCreateService } from '../../application/service/answer-create.service';
import { AnswerDeleteService } from '../../application/service/answer-delete.service';
import { AnswerFindService } from '../../application/service/answer-find.service';
import { AnswerUpdateService } from '../../application/service/answer-update.service';

@ApiTags('공개 QnA 답변 관리')
@Controller('answer')
export class AnswerController {
  constructor(
    private readonly answerCreateService: AnswerCreateService,
    private readonly answerDeleteService: AnswerDeleteService,
    private readonly answerUpdateService: AnswerUpdateService,
    private readonly answerFindService: AnswerFindService,
    private readonly responseService: ResponseService,
  ) {}

  @ApiOperation({ summary: '답변 등록' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
    schema: { type: 'object', properties: { identifier: { type: 'string' } } },
  })
  @ApiBearerAuth('token')
  @Permissions(PermissionType.COMMENT_ACCESS, PermissionType.COMMNET_MANAGE)
  @Post('/')
  async registerAnswer(
    @MemberIdentifier() memberIdentifier: number,
    @Body() answerCreateReqDto: AnswerCreateReqDto,
  ) {
    try {
      const commentIdentifier: string = (
        await this.answerCreateService.create(
          memberIdentifier,
          answerCreateReqDto,
        )
      ).toString();
      return this.responseService.success(
        '답변이 성공적으로 등록되었습니다.',
        HttpStatus.CREATED,
        { commentIdentifier },
      );
    } catch (error) {
      return this.responseService.error(error.response, error.status);
    }
  }

  @ApiOperation({ summary: '답변 수정' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
    schema: { type: 'object', properties: { identifier: { type: 'string' } } },
  })
  @ApiBearerAuth('token')
  @Permissions(PermissionType.COMMENT_ACCESS, PermissionType.COMMNET_MANAGE)
  @Put('/:answerIdentifier')
  async updateAnswer(
    @Param('answerIdentifier') identifier: number,
    @MemberIdentifier() memberIdentifier: number,
    @Body()
    answerUpdateReqDto: AnswerUpdateReqDto,
  ) {
    try {
      const commentIdentifier: string = (
        await this.answerUpdateService.update(
          identifier,
          memberIdentifier,
          answerUpdateReqDto,
        )
      ).toString();
      return this.responseService.success(
        '답변이 성공적으로 수정되었습니다',
        HttpStatus.OK,
        { commentIdentifier },
      );
    } catch (error) {
      return this.responseService.error(error.response, error.status);
    }
  }

  @ApiOperation({ summary: '답변 삭제' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
    schema: { type: 'object', properties: { identifier: { type: 'string' } } },
  })
  @ApiBearerAuth('token')
  @Permissions(PermissionType.COMMENT_ACCESS, PermissionType.COMMNET_MANAGE)
  @Delete('/:answerIdentifier')
  async deleteAnswer(
    @Param('answerIdentifier') identifier: number,
    @MemberIdentifier() memberIdentifier: number,
  ): Promise<Response | undefined> {
    try {
      const commentIdentifier: string = (
        await this.answerDeleteService.delete(identifier, memberIdentifier)
      ).toString();
      return this.responseService.success(
        '답변을 성공적으로 삭제했습니다.',
        HttpStatus.OK,
        { commentIdentifier },
      );
    } catch (error) {
      console.log(error);
      return this.responseService.error(error.response, error.status);
    }
  }

  @ApiOperation({ summary: '답변 요청' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
    type: [AnswerFindResDto],
  })
  @Permissions()
  @Get('/:postIdentifier')
  async viewAnswer(
    @Param('postIdentifier') postIdentifier: number,
    @MemberIdentifier() memberIdentifier: number,
  ): Promise<Response | undefined> {
    try {
      const answers = await this.answerFindService.find(
        postIdentifier,
        memberIdentifier,
      );
      return this.responseService.success(
        '답변을 성공적으로 조회하였습니다.',
        HttpStatus.OK,
        answers,
      );
    } catch (error) {
      return this.responseService.error(error.response, error.status);
    }
  }
}
