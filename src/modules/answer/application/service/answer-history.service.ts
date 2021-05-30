import { Inject, Injectable } from '@nestjs/common';
import { AnswerPort, ANSWER_PORT } from '../../domain/port/answer.port';
import { AnswerHistoryResDto } from '../dto/answer-history.dto';
import { NotExistException } from '../exception/not-exist.exception';

@Injectable()
export class AnswerHistoryService {
  constructor(@Inject(ANSWER_PORT) private readonly answerPort: AnswerPort) {}

  async history(
    memberIdentifier: number,
    perPage: number,
    skippedItems: number,
  ): Promise<AnswerHistoryResDto[] | undefined> {
    const answers: AnswerHistoryResDto[] = await this.answerPort.findPaginatedAnswerByMemberIdentifier(
      memberIdentifier,
      skippedItems,
      perPage,
    );
    if (!answers) {
      throw new NotExistException();
    }

    return answers;
  }
}
