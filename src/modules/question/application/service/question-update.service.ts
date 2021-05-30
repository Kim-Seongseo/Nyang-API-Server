import { Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
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
    const questionIdentifier = await this.questionPort.updateQuestion(
      identifier,
      questionUpdateReqDto,
    );
    if (!questionIdentifier) {
      throw new UnexpectedErrorException();
    }
    return questionIdentifier;
  }
}
