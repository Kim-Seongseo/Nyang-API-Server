import { Inject, Injectable } from '@nestjs/common';
import { AnswerPort, ANSWER_PORT } from '../../domain/port/answer.port';

@Injectable()
export class AnswerUtilService {
  constructor(@Inject(ANSWER_PORT) private readonly answerPort: AnswerPort) {}

  async skip(page: number, perPage: number): Promise<number | undefined> {
    return (page - 1) * perPage;
  }

  async totalDataPerMember(
    memberIdentifier: number,
  ): Promise<number | undefined> {
    return await this.answerPort.countBoardByMemberIdentifier(memberIdentifier);
  }

  async totalPage(
    totalData: number,
    perPage: number,
  ): Promise<number | undefined> {
    return Math.ceil(totalData / perPage);
  }
}
