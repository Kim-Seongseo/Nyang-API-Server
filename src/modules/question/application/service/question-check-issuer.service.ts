import { Injectable } from '@nestjs/common';
import { QuestionRepository } from '../../infrastructure/repository/question.repository';

@Injectable()
export class QuestionCheckIssuerService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async isIssuer(
    memberIdentifier: number,
    questionIdentifier: number,
  ): Promise<boolean | undefined> {
    const issuer: number = (
      await this.questionRepository.findOne({
        identifier: questionIdentifier,
      })
    ).member_identifier.identifier; // have to refactor with querybuilder
    return issuer === memberIdentifier;
  }
}
