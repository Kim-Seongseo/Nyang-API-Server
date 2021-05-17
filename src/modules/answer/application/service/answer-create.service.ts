import { Inject, Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { AnswerPort, ANSWER_PORT } from '../../domain/port/answer.port';
import { AnswerCreateReqDto } from '../dto/answer-create.dto';

@Injectable()
export class AnswerCreateService {
  constructor(@Inject(ANSWER_PORT) private readonly answerPort: AnswerPort) {}

  async create(
    memberIdentifier: number,
    answerCreateReqDto: AnswerCreateReqDto,
  ): Promise<number | undefined> {
    try {
      const answerIdentifier: number = await this.answerPort.createAnswer(
        memberIdentifier,
        answerCreateReqDto,
      );
      return answerIdentifier;
    } catch (error) {
      throw new UnexpectedErrorException();
    }
  }
}
