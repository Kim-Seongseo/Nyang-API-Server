import { Inject, Injectable } from '@nestjs/common';
import { QuestionPort, QUESTION_PORT } from '../../domain/port/question.port';
import { NotExistException } from '../exception/not-exist.exception';

@Injectable()
export class QuestionCheckIssuerService {
  constructor(
    @Inject(QUESTION_PORT) private readonly questionPort: QuestionPort,
  ) {}

  async isIssuer(
    memberIdentifier: number,
    isAdmin: boolean,
    questionIdentifier: number,
  ): Promise<boolean | undefined> {
    const issuer: number = await this.questionPort.findQuestionIssuerByIdentifier(questionIdentifier);
    if (!issuer) {
      throw new NotExistException();
    }

    return issuer === memberIdentifier || isAdmin;
  }
}
