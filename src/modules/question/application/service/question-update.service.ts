import { Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { QuestionPort, QUESTION_PORT } from '../../domain/port/question.port';
import { QuestionRepository } from '../../infrastructure/persistence/repository/question.repository';
import { QuestionUpdateReqDto } from '../dto/question-update.dto';

@Injectable()
export class QuestionUpdateService {
  constructor(
    @Inject(QUESTION_PORT) private readonly questionPort: QuestionPort,
  ) {}

  async update(
    identifier: number,
    questionUpdateReqDto: QuestionUpdateReqDto,
  ): Promise<number | undefined> {
    try {
      const questionIdentifier = await this.questionPort.updateQuestion(
        identifier,
        questionUpdateReqDto,
      );

      return questionIdentifier;
    } catch (error) {
      throw new RequestTimeoutException();
    }
  }
}
