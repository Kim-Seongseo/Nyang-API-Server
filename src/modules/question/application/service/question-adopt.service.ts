import { Inject, Injectable } from '@nestjs/common';
import { QuestionState } from '../../domain/entity/question-state.enum';
import { QuestionPort, QUESTION_PORT } from '../../domain/port/question.port';

@Injectable()
export class QuestionAdoptService {
  constructor(
    @Inject(QUESTION_PORT) private readonly questionPort: QuestionPort,
  ) {}

  async adopt(postIdentifier: number): Promise<number | undefined> {
    const identifier: number = await this.questionPort.updateQuestionState(
      postIdentifier,
      QuestionState.ADOPTED,
    );
    return identifier;
  }
}
