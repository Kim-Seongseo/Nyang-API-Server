import { Inject, Injectable } from '@nestjs/common';
import { AnswerPort, ANSWER_PORT } from '../../domain/port/answer.port';
import { AnswerFindResDto } from '../dto/answer-find.dto';
import { NotExistException } from '../exception/not-exist.exception';

@Injectable()
export class AnswerFindService {
  constructor(@Inject(ANSWER_PORT) private readonly answerPort: AnswerPort) {}

  async find(
    postIdentifier: number,
    memberIdentifier: number,
  ): Promise<AnswerFindResDto[] | undefined> {
    const answers: AnswerFindResDto[] = await this.answerPort.findAnswersByPostIdentifier(
      postIdentifier,
      memberIdentifier,
    );
    if (!answers) {
      throw new NotExistException();
    }
    return answers;
  }
}
