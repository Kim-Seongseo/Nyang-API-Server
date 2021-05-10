import { Controller, Body, Param, Post, Get, Put, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/modules/auth/decorator/skip-auth.decorator';
import { QuestionCreateReqDto } from '../../application/dto/question-enroll.dto';
import { QuestionSearchReqDto } from '../../application/dto/question-search.dto';
import { QuestionUpdateReqDto } from '../../application/dto/question-update.dto';
import { QuestionViewResDto } from '../../application/dto/question-view.dto';
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
    private readonly questionSearchService: QuestionSearchService
  ) {}

  @ApiOperation({ summary: '질문 등록' })
  @Public()
  @Post('/')
  async registerQuestion(@Body() questionCreateReqDto: QuestionCreateReqDto): Promise<any | undefined> {
    return await this.questionCreateService.create(questionCreateReqDto);
  }

  @ApiOperation({ summary: '질문 수정' })
  @Public()
  @Put('/:identifier')
  async updateQuestion(
    @Param() identifier: number,
    @Body() questionUpdateReqDto: QuestionUpdateReqDto
  ): Promise<any | undefined> {
    return await this.questionUpdateService.update(
      identifier['identifier'],
      questionUpdateReqDto
    );
  }

  @ApiOperation({ summary: '질문 삭제' })
  @Public()
  @Delete('/:identifier')
  async deleteQuestion(@Param() identifier: number): Promise<any | undefined> {
    return await this.questionDeleteService.delete(identifier['identifier']);
  }

  @ApiOperation({ summary: '질문 조회' })
  @Public()
  @Get('/')
  async viewQuestion(): Promise<QuestionViewResDto | undefined> {
    return this.questionViewService.view();
  }

  @ApiOperation({ summary: '질문 상세 조회' })
  @Public()
  @Get('/:identifier')
  async viewDetail(@Param() identifier: number): Promise<any | undefined> {
    return await this.questionDetailViewService.detailView(identifier['identifier']);
  }

  @ApiOperation({ summary: '질문 검색' })
  @Public()
  @Post('/search')
  async searchQuestion(@Body() questionSearchReqDto: QuestionSearchReqDto): Promise<any | undefined> {
    return await this.questionSearchService.searchQuestion(questionSearchReqDto);
  }
}
