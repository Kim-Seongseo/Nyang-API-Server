import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { QuestionPort, QUESTION_PORT } from '../../domain/port/question.port';
import { QuestionDetailViewResDto } from '../dto/question-detail.dto';

@Injectable()
export class QuestionDetailViewService {
  constructor(
    @Inject(QUESTION_PORT) private readonly questionPort: QuestionPort,
  ) {}

  async detailView(
    memberIdentifier: number,
    memberIsAdmin: boolean,
    identifier: number,
  ): Promise<QuestionDetailViewResDto | undefined> {
    const question: QuestionDetailViewResDto = await this.questionPort.findQuestionDetailByIdentifierAndMember(
      memberIdentifier,
      memberIsAdmin,
      identifier,
    );

    if (!question) throw new NotFoundException();
    return question;
  }
}
