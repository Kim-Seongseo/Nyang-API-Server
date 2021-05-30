import { Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { QuestionPort, QUESTION_PORT } from '../../domain/port/question.port';

@Injectable()
export class QuestionDeleteService {
  constructor(
    @Inject(QUESTION_PORT) private readonly questionPort: QuestionPort,
  ) {}

  async delete(identifier: number): Promise<number | undefined> {
    const questionIdentifier = await this.questionPort.deleteQuestionByIdentifier(
      identifier,
    );
    if (!questionIdentifier) {
      throw new UnexpectedErrorException();
    }

    return questionIdentifier;
  }
}
