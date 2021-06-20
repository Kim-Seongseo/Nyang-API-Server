import { Inject, Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { Answer } from '../../domain/entity/answer.entity';
import { AnswerPort, ANSWER_PORT } from '../../domain/port/answer.port';
import { AnswerState } from '../../domain/type/answer-state.type';
import { NotExistException } from '../exception/not-exist.exception';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { QuestionRelegationService } from 'src/modules/question/application/service/question-relegation.service';

@Injectable()
export class AnswerRelegationService {
  constructor(@Inject(ANSWER_PORT) private readonly answerPort: AnswerPort,
  private readonly questionRelegationService:QuestionRelegationService) {}

  @Transactional()
  async relegation(answerIdentifier: number, postIdentifier:number): Promise<number | undefined> {
    const answer: Answer = await this.answerPort.findAnswerByIdentifier(
      answerIdentifier,
    );
    if (!answer) {
      throw new NotExistException();
    }

    answer.select_state = AnswerState.NONE;
    const identifier: number = await this.answerPort.saveAnswer(answer);
    if (!answerIdentifier) {
      throw new UnexpectedErrorException();
    }

    await this.questionRelegationService.relegation(postIdentifier);

    return identifier;
  }
}
