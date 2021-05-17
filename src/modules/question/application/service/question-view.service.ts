import { Inject, Injectable } from '@nestjs/common';
import { QuestionPort, QUESTION_PORT } from '../../domain/port/question.port';
import { QuestionViewResDto } from '../dto/question-view.dto';

@Injectable()
export class QuestionViewService {
  constructor(@Inject(QUESTION_PORT) private questionPort: QuestionPort) {}

  async paginatedView(
    perPage: number,
    skippedItems: number,
  ): Promise<QuestionViewResDto[] | undefined> {
    const questions: QuestionViewResDto[] = await this.questionPort.findPaginatedQuestion(
      skippedItems,
      perPage,
    );
    return questions;
  }
}
