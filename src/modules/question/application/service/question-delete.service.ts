import { Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { QuestionPort, QUESTION_PORT } from '../../domain/port/question.port';

@Injectable()
export class QuestionDeleteService {
  constructor(
    @Inject(QUESTION_PORT) private readonly questionPort: QuestionPort,
  ) {}

  async delete(identifier: number): Promise<number | undefined> {
    try {
      const questionIdentifier = await this.questionPort.deleteQuestionByIdentifier(
        identifier,
      );
      return questionIdentifier;
    } catch (error) {
      throw new RequestTimeoutException();
    }
  }
}
