import { Injectable, NotFoundException } from '@nestjs/common';
import { classToPlain, plainToClass } from 'class-transformer';
import { QuestionRepository } from '../../infrastructure/repository/question.repository';
import { QuestionSearchReqDto } from '../dto/question-search.dto';
import { QuestionViewResDto } from '../dto/question-view.dto';

@Injectable()
export class QuestionSearchService {
  constructor(private questionRepository: QuestionRepository) {}

  async searchQuestion(
    skippedItems: number,
    perPage: number,
    questionSearchReqDto: QuestionSearchReqDto,
  ): Promise<QuestionViewResDto[] | undefined> {
    const questions: QuestionViewResDto[] = await this.questionRepository.getPaginatedQuestionByKeyword(
      skippedItems,
      perPage,
      questionSearchReqDto.keyword,
    );

    if (!questions || !questions.length) throw new NotFoundException();
    return questions;
  }
}
