import {
  Controller,
  Body,
  Param,
  Post,
  Get,
  Put,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MemberIdentifier } from 'src/modules/member/decorator/member-identifier.decorator';
import { MemberIsAdmin } from 'src/modules/member/decorator/member-isAdmin.decorator';
import { ResponseService } from 'src/modules/response/application/service/response.service';
import { Response } from 'src/modules/response/response.interface';
import { Permissions } from 'src/modules/role/decorator/role.decorator';
import { PermissionType } from 'src/modules/role/domain/type/permission-type.enum';
import { QuestionDetailViewResDto } from '../../application/dto/question-detail.dto';
import { QuestionCreateReqDto } from '../../application/dto/question-enroll.dto';
import { QuestionSearchReqDto } from '../../application/dto/question-search.dto';
import { QuestionUpdateReqDto } from '../../application/dto/question-update.dto';
import { QuestionViewResDto } from '../../application/dto/question-view.dto';
import { NotAIssuer } from '../../application/exception/not-a-issuer.exception';
import { QuestionCheckIssuerService } from '../../application/service/question-check-issuer.service';
import { QuestionCreateService } from '../../application/service/question-create.service';
import { QuestionDeleteService } from '../../application/service/question-delete.service';
import { QuestionDetailViewService } from '../../application/service/question-detail-view.service';
import { QuestionSearchService } from '../../application/service/question-search.service';
import { QuestionUpdateService } from '../../application/service/question-update.service';
import { QuestionViewService } from '../../application/service/question-view.service';

@ApiTags('공개 QnA 질문 관리')
@Controller('question')
export class QuestionController {
  constructor(
    private readonly questionCreateService: QuestionCreateService,
    private readonly questionUpdateService: QuestionUpdateService,
    private readonly questionDeleteService: QuestionDeleteService,
    private readonly questionViewService: QuestionViewService,
    private readonly questionDetailViewService: QuestionDetailViewService,
    private readonly questionSearchService: QuestionSearchService,
    private readonly questionCheckIssuerService: QuestionCheckIssuerService,
    private readonly responseService: ResponseService,
  ) {}

  @ApiOperation({ summary: '질문 등록' })
  @ApiBearerAuth('token')
  @Permissions(PermissionType.QUESTION_ACCESS, PermissionType.QUESTION_MANAGE)
  @Post('/')
  async registerQuestion(
    @MemberIdentifier() memberIdentifier: number,
    @Body() questionCreateReqDto: QuestionCreateReqDto,
  ): Promise<Response | undefined> {
    try {
      const questionIdentifier: string = (
        await this.questionCreateService.create(
          memberIdentifier,
          questionCreateReqDto,
        )
      ).toString();
      return this.responseService.success(
        '질문을 정상적으로 등록했습니다',
        HttpStatus.CREATED,
        { questionIdentifier },
      );
    } catch (error) {
      console.log(error);
      return this.responseService.error(error.response, error.status);
    }
  }

  @ApiOperation({ summary: '질문 수정' })
  @ApiBearerAuth('token')
  @Permissions(PermissionType.QUESTION_ACCESS, PermissionType.QUESTION_MANAGE)
  @Put('/:identifier')
  async updateQuestion(
    @Param('identifier') identifier: number,
    @MemberIdentifier() memberIdentifier: number,
    @Body() questionUpdateReqDto: QuestionUpdateReqDto,
  ): Promise<Response | undefined> {
    try {
      if (
        !this.questionCheckIssuerService.isIssuer(memberIdentifier, identifier)
      ) {
        throw new NotAIssuer();
      }

      const questionIdentifier: string = (
        await this.questionUpdateService.update(
          identifier,
          questionUpdateReqDto,
        )
      ).toString();
      return this.responseService.success(
        '질문이 성공적으로 수정되었습니다.',
        HttpStatus.OK,
        { questionIdentifier },
      );
    } catch (error) {
      return this.responseService.error(error.response, error.status);
    }
  }

  @ApiOperation({ summary: '질문 삭제' })
  @ApiBearerAuth('token')
  @Permissions(PermissionType.QUESTION_ACCESS, PermissionType.QUESTION_MANAGE)
  @Delete('/:identifier')
  async deleteQuestion(
    @MemberIdentifier() memberIdentifier: number,
    @Param('identifier') identifier: number,
  ): Promise<any | undefined> {
    try {
      if (
        !this.questionCheckIssuerService.isIssuer(memberIdentifier, identifier)
      ) {
        throw new NotAIssuer();
      }

      const questionIdentifier: string = (
        await this.questionDeleteService.delete(identifier)
      ).toString();
      return this.responseService.success(
        '질문이 성공적으로 삭제되었습니다.',
        HttpStatus.OK,
        { questionIdentifier },
      );
    } catch (error) {
      return this.responseService.error(error.response, error.status);
    }
  }

  @ApiOperation({ summary: '질문 조회' })
  @Permissions()
  @Get('/')
  async viewQuestion(): Promise<Response | undefined> {
    try {
      const questionInfo: QuestionViewResDto = await this.questionViewService.view();
      return this.responseService.success(
        '질문을 성공적으로 조회하였습니다.',
        HttpStatus.OK,
        { questionInfo },
      );
    } catch (error) {
      return this.responseService.error(error.response, error.status);
    }
  }

  @ApiOperation({ summary: '질문 상세 조회' })
  @ApiBearerAuth('token')
  @Permissions(PermissionType.OPTION, PermissionType.QUESTION_MANAGE)
  @Get('/:identifier')
  async viewDetail(
    @MemberIdentifier() memberIdentifier: number,
    @MemberIsAdmin() memberIsAdmin: boolean,
    @Param('identifier') identifier: number,
  ): Promise<Response | undefined> {
    try {
      const questionInfo: QuestionDetailViewResDto = await this.questionDetailViewService.detailView(
        memberIdentifier,
        memberIsAdmin,
        identifier,
      );

      return this.responseService.success(
        '질문을 성공적으로 조회했습니다.',
        HttpStatus.OK,
        { questionInfo },
      );
    } catch (error) {
      return this.responseService.error(error.response, error.status);
    }
  }

  @ApiOperation({ summary: '질문 검색' })
  @Permissions()
  @Post('/search')
  async searchQuestion(
    @Body() questionSearchReqDto: QuestionSearchReqDto,
  ): Promise<any | undefined> {
    try {
      const questionInfo: QuestionViewResDto = await this.questionSearchService.searchQuestion(
        questionSearchReqDto,
      );
      return this.responseService.success(
        '질문이 성공적으로 검색되었습니다.',
        HttpStatus.OK,
        { questionInfo },
      );
    } catch (error) {
      return this.responseService.error(error.response, error.status);
    }
  }
}
