import {
  Controller,
  Body,
  Param,
  Post,
  Get,
  Put,
  Delete,
  HttpStatus,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MemberIdentifier } from 'src/modules/member/decorator/member-identifier.decorator';
import { MemberIsAdmin } from 'src/modules/member/decorator/member-isAdmin.decorator';
import { ResponseService } from 'src/modules/response/application/service/response.service';
import { Response } from 'src/modules/response/domain/response.interface';
import { Permissions } from 'src/modules/role/decorator/role.decorator';
import { PermissionType } from 'src/modules/role/domain/type/permission-type.enum';
import { QuestionDetailViewResDto } from '../../application/dto/question-detail.dto';
import { QuestionCreateReqDto } from '../../application/dto/question-enroll.dto';
import { QuestionSearchReqDto } from '../../application/dto/question-search.dto';
import { QuestionUpdateReqDto } from '../../application/dto/question-update.dto';
import { QuestionViewResDto } from '../../application/dto/question-view.dto';
import { NotAIssuerException } from '../../application/exception/not-a-issuer.exception';
import { QuestionCheckIssuerService } from '../../application/service/question-check-issuer.service';
import { QuestionCreateService } from '../../application/service/question-create.service';
import { QuestionDeleteService } from '../../application/service/question-delete.service';
import { QuestionDetailViewService } from '../../application/service/question-detail-view.service';
import { QuestionSearchService } from '../../application/service/question-search.service';
import { QuestionUpdateService } from '../../application/service/question-update.service';
import { QuestionUtilService } from '../../application/service/question-util-service';
import { QuestionViewService } from '../../application/service/question-view.service';
import { PAGE, PER_PAGE } from '../../domain/constant/pagination.constant';

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
    private readonly quesitonUtileService: QuestionUtilService,
    private readonly responseService: ResponseService,
  ) {}

  @ApiOperation({ summary: '질문 등록' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
    schema: { type: 'object', properties: { identifier: { type: 'string' } } },
  })
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
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
    schema: { type: 'object', properties: { identifier: { type: 'string' } } },
  })
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
        throw new NotAIssuerException();
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
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
    schema: { type: 'object', properties: { identifier: { type: 'string' } } },
  })
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
        throw new NotAIssuerException();
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
  @ApiQuery({
    name: 'page',
    type: 'string',
    required: true,
  })
  @ApiQuery({
    name: 'perPage',
    type: 'string',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
    type: [QuestionViewResDto],
  })
  @Permissions()
  @Get('/')
  async viewQuestion(
    @Query('page', new DefaultValuePipe(PAGE), ParseIntPipe) page: number,
    @Query('perPage', new DefaultValuePipe(PER_PAGE), ParseIntPipe)
    perPage: number,
  ): Promise<Response | undefined> {
    try {
      // 현재 페이지: page
      // 페이지당 게시물 수 : perPage
      // 페이지 내 게시물: questions
      // 총 게시물 수: totalData
      // 총 페이지 수: totalPage
      const skippedItems: number = await this.quesitonUtileService.skip(
        page,
        perPage,
      );
      const questions: QuestionViewResDto[] = await this.questionViewService.paginatedView(
        perPage,
        skippedItems,
      );

      const totalData = await this.quesitonUtileService.totalData();
      const totalPage = await this.quesitonUtileService.totalPage(
        totalData,
        perPage,
      );
      return this.responseService.paging(
        '질문을 성공적으로 조회하였습니다.',
        HttpStatus.OK,
        totalData,
        totalPage,
        page,
        perPage,
        questions,
      );
    } catch (error) {
      return this.responseService.error(error.response, error.status);
    }
  }

  @ApiOperation({ summary: '질문 상세 조회' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
    type: [QuestionDetailViewResDto],
  })
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
        questionInfo,
      );
    } catch (error) {
      return this.responseService.error(error.response, error.status);
    }
  }

  @ApiOperation({ summary: '질문 검색' })
  @ApiQuery({
    name: 'page',
    type: 'string',
    required: true,
  })
  @ApiQuery({
    name: 'perPage',
    type: 'string',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
    type: [QuestionViewResDto],
  })
  @Permissions()
  @Post('/search')
  async searchQuestion(
    @Body() questionSearchReqDto: QuestionSearchReqDto,
    @Query('page', new DefaultValuePipe(PAGE), ParseIntPipe) page: number,
    @Query('perPage', new DefaultValuePipe(PER_PAGE), ParseIntPipe)
    perPage: number,
  ): Promise<any | undefined> {
    try {
      const skippedItems: number = await this.quesitonUtileService.skip(
        page,
        perPage,
      );
      const questions: QuestionViewResDto[] = await this.questionSearchService.searchQuestion(
        skippedItems,
        perPage,
        questionSearchReqDto,
      );

      const totalData = await this.quesitonUtileService.totalData();
      const totalPage = await this.quesitonUtileService.totalPage(
        totalData,
        perPage,
      );
      return this.responseService.paging(
        '질문이 성공적으로 검색되었습니다.',
        HttpStatus.OK,
        totalData,
        totalPage,
        page,
        perPage,
        questions,
      );
    } catch (error) {
      return this.responseService.error(error.response, error.status);
    }
  }
}
