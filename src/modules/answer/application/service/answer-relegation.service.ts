import { Inject, Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { Answer } from '../../domain/entity/answer.entity';
import { AnswerPort, ANSWER_PORT } from '../../domain/port/answer.port';
import { AnswerState } from '../../domain/type/answer-state.type';
import { NotExistException } from '../exception/not-exist.exception';

@Injectable()
export class AnswerRelegationService {
  constructor(@Inject(ANSWER_PORT) private readonly answerPort: AnswerPort) {}

  async relegation(identifier: number): Promise<number | undefined> {
    const answer: Answer = await this.answerPort.findAnswerByIdentifier(
      identifier,
    );
    if (!answer) {
      throw new NotExistException();
    }

    answer.select_state = AnswerState.NONE;
    const answerIdentifier: number = await this.answerPort.saveAnswer(answer);
    if (!answerIdentifier) {
      throw new UnexpectedErrorException();
    }

    return answerIdentifier;
  }
}
