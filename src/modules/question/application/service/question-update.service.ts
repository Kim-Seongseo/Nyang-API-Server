import { Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { QuestionPort, QUESTION_PORT } from '../../domain/port/question.port';
import { QuestionUpdateReqDto } from '../dto/question-update.dto';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class QuestionUpdateService {
  constructor(
    @Inject(QUESTION_PORT) private readonly questionPort: QuestionPort,
  ) {}

  @Transactional()
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
