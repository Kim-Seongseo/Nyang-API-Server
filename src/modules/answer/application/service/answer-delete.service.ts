import { Injectable } from '@nestjs/common';
import { AnswerRepository } from '../../infrastructure/repository/answer.repository';
import { NotAIssuerException } from '../exception/not-a-issuer.exception';

@Injectable()
export class AnswerDeleteService {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async delete(
    identifier: number,
    memberIdentifier: number,
  ): Promise<number | undefined> {
    const comment = await this.answerRepository.findOne({ identifier });
    if (comment.member_identifier.identifier === memberIdentifier) {
      throw new NotAIssuerException();
    }
    await this.answerRepository.delete(comment);
    return comment.identifier;
  }
}
