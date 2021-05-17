import { Inject, Injectable } from '@nestjs/common';
import { QuestionPort, QUESTION_PORT } from '../../domain/port/question.port';

@Injectable()
export class QuestionUtilService {
  constructor(
    @Inject(QUESTION_PORT) private readonly questionPort: QuestionPort,
  ) {}

  async skip(page: number, perPage: number): Promise<number | undefined> {
    return (page - 1) * perPage;
  }

  async totalData(): Promise<number | undefined> {
    return await this.questionPort.countQuestion();
  }

  async totalPage(
    totalData: number,
    perPage: number,
  ): Promise<number | undefined> {
    return Math.ceil(totalData / perPage);
  }
}
