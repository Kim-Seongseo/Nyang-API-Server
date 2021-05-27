import { QuestionDetailViewResDto } from '../../application/dto/question-detail.dto';
import { QuestionCreateReqDto } from '../../application/dto/question-enroll.dto';
import { QuestionUpdateReqDto } from '../../application/dto/question-update.dto';
import { QuestionViewResDto } from '../../application/dto/question-view.dto';
import { Question } from '../entity/question.entity';

export const QUESTION_PORT = 'QUESTION_PORT';

export interface QuestionPort {
  createQuestion(
    memberIdentifier: number,
    questionCreateReqDto: QuestionCreateReqDto,
  ): Promise<number | undefined>;

  updateQuestion(
    identifier: number,
    questionUpdateReqDto: QuestionUpdateReqDto,
  ): Promise<number | undefined>;

  deleteQuestionByIdentifier(identifier: number): Promise<number | undefined>;

  findQuestionByIdentifier(identifier: number): Promise<Question | undefined>;

  findQuestionDetailByIdentifierAndMember(
    memberIdentifier: number,
    memberIsAdmin: boolean,
    identifier: number,
  ): Promise<QuestionDetailViewResDto | undefined>;

  findPaginatedQuestionByKeyword(
    skippedItems: number,
    perPage: number,
    keyword: string,
  ): Promise<QuestionViewResDto[] | undefined>;

  findPaginatedQuestion(
    skippedItems: number,
    perPage: number,
  ): Promise<QuestionViewResDto[] | undefined>;

  countQuestion(): Promise<number | undefined>;

  updateQuestionState(answerIdentifier: number): Promise<void | undefined>;
}
