import { Inject, Injectable } from '@nestjs/common';
import { QuestionPort, QUESTION_PORT } from '../../domain/port/question.port';
import { QuestionRepository } from '../../infrastructure/persistence/repository/question.repository';

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
    const issuer: number = (
      await this.questionPort.findQuestionByIdentifier(questionIdentifier)
    ).member_identifier.identifier; // have to refactor with querybuilder

    console.log(isAdmin);
    return issuer === memberIdentifier || isAdmin;
  }
}
