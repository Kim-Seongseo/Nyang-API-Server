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
    const member = await comment.member_identifier;
    if (member.identifier !== memberIdentifier) {
      throw new NotAIssuerException();
    }
    await this.answerRepository.delete({ identifier });
    return identifier;
  }
}
