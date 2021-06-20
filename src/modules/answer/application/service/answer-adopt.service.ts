import { Inject, Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { QuestionAdoptService } from 'src/modules/question/application/service/question-adopt.service';
import { Answer } from '../../domain/entity/answer.entity';
import { AnswerPort, ANSWER_PORT } from '../../domain/port/answer.port';
import { AnswerState } from '../../domain/type/answer-state.type';
import { NotExistException } from '../exception/not-exist.exception';
import { Transactional } from 'typeorm-transactional-cls-hooked';
@Injectable()
export class AnswerAdoptService {
  constructor(@Inject(ANSWER_PORT) private readonly answerPort: AnswerPort,
  private readonly questionAdoptService: QuestionAdoptService,
  ) {}

  @Transactional()
  async adopt(answerIdentifier: number, postIdentifier: number): Promise<number | undefined> {
    const answer: Answer = await this.answerPort.findAnswerByIdentifier(
      answerIdentifier,
    );
    if (!answer) {
      throw new NotExistException();
    }

    answer.select_state = AnswerState.SELECTED;

    const identifier: number = await this.answerPort.saveAnswer(answer);
    if (!answerIdentifier) {
      throw new UnexpectedErrorException();
    }

    await this.questionAdoptService.adopt(postIdentifier);

    return identifier;
  }
}
