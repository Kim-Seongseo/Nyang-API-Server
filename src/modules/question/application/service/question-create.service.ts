import { Inject, Injectable } from '@nestjs/common';
import { QuestionPort, QUESTION_PORT } from '../../domain/port/question.port';
import { QuestionCreateReqDto } from '../dto/question-enroll.dto';

@Injectable()
export class QuestionCreateService {
  constructor(
    @Inject(QUESTION_PORT) private readonly questionPort: QuestionPort,
  ) {}

  async create(
    memberIdentifier: number,
    questionCreateReqDto: QuestionCreateReqDto,
  ): Promise<number | undefined> {
    const questionIdentifier = await this.questionPort.createQuestion(
      memberIdentifier,
      questionCreateReqDto,
    );

    return questionIdentifier;
  }
}
