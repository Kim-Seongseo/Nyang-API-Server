import { Inject, Injectable } from '@nestjs/common';
import { Member } from 'src/modules/member/domain/entity/member.entity';
import { Answer } from '../../domain/entity/answer.entity';
import { AnswerPort, ANSWER_PORT } from '../../domain/port/answer.port';
import { NotAIssuerException } from '../exception/not-a-issuer.exception';

@Injectable()
export class AnswerDeleteService {
  constructor(@Inject(ANSWER_PORT) private readonly answerPort: AnswerPort) {}

  async delete(
    identifier: number,
    memberIdentifier: number,
  ): Promise<number | undefined> {
    const answer: Answer = await this.answerPort.findAnswerByIdentifier(
      identifier,
    );

    const member: Member = await answer.member_identifier;
    if (member.identifier !== memberIdentifier) {
      throw new NotAIssuerException();
    }

    const answerIdentifier: number = await this.answerPort.deleteAnswerByIdentifier(
      identifier,
    );
    return answerIdentifier;
  }
}
