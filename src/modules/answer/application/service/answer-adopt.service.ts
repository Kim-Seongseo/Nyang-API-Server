import { Inject, Injectable } from '@nestjs/common';
import { Answer } from '../../domain/entity/answer.entity';
import { AnswerPort, ANSWER_PORT } from '../../domain/port/answer.port';
import { AnswerState } from '../../domain/type/answer-state.type';

@Injectable()
export class AnswerAdoptService {
  constructor(@Inject(ANSWER_PORT) private readonly answerPort: AnswerPort) {}

  async adopt(identifier: number): Promise<number | undefined> {
    const answer: Answer = await this.answerPort.findAnswerByIdentifier(
      identifier,
    );
    console.log(answer);
    answer.select_state = AnswerState.SELECTED;

    const answerIdentifier: number = await this.answerPort.saveAnswer(answer);
    return answerIdentifier;
  }
}
