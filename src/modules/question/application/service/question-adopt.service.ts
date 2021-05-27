import { Inject, Injectable } from '@nestjs/common';
import { QuestionPort, QUESTION_PORT } from '../../domain/port/question.port';

@Injectable()
export class QuestionAdoptService {
  constructor(
    @Inject(QUESTION_PORT) private readonly questionPort: QuestionPort,
  ) {}

  async adopt(postIdentifier: number): Promise<void | undefined> {
    await this.questionPort.updateQuestionState(postIdentifier);
  }
}
