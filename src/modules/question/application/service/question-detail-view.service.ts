import { Injectable, NotFoundException } from '@nestjs/common';
import { classToPlain, plainToClass } from 'class-transformer';
import { MemberIsAdmin } from 'src/modules/member/decorator/member-isAdmin.decorator';
import { QuestionRepository } from '../../infrastructure/repository/question.repository';
import { QuestionDetailViewResDto } from '../dto/question-detail.dto';

@Injectable()
export class QuestionDetailViewService {
  constructor(private questionRepository: QuestionRepository) {}

  async detailView(
    memberIdentifier: number,
    memberIsAdmin: boolean,
    identifier: number,
  ): Promise<QuestionDetailViewResDto | undefined> {
    console.log(memberIdentifier);
    const result = await this.questionRepository.getQuestionDetailByIdentifier(
      memberIdentifier,
      memberIsAdmin,
      identifier,
    );

    if (!result) throw new NotFoundException();
    return result;
  }
}
