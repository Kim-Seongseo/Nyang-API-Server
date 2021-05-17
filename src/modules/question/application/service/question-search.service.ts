import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { QuestionPort, QUESTION_PORT } from '../../domain/port/question.port';
import { QuestionQueryRepository } from '../../infrastructure/persistence/repository/question-query.repository';
import { QuestionSearchReqDto } from '../dto/question-search.dto';
import { QuestionViewResDto } from '../dto/question-view.dto';

@Injectable()
export class QuestionSearchService {
  constructor(
    @Inject(QUESTION_PORT) private readonly questionPort: QuestionPort,
  ) {}

  async searchQuestion(
    skippedItems: number,
    perPage: number,
    questionSearchReqDto: QuestionSearchReqDto,
  ): Promise<QuestionViewResDto[] | undefined> {
    const questions: QuestionViewResDto[] = await this.questionPort.findPaginatedQuestionByKeyword(
      skippedItems,
      perPage,
      questionSearchReqDto.keyword,
    );

    if (!questions || !questions.length) throw new NotFoundException();
    return questions;
  }
}
