import { Injectable } from '@nestjs/common';
import { RecordState } from 'src/modules/post/domain/entity/record-state.enum';
import { QuestionDetailViewResDto } from '../../application/dto/question-detail.dto';
import { QuestionCreateReqDto } from '../../application/dto/question-enroll.dto';
import { QuestionHistoryResDto } from '../../application/dto/question-history.dto';
import { QuestionUpdateReqDto } from '../../application/dto/question-update.dto';
import { QuestionViewResDto } from '../../application/dto/question-view.dto';
import { QuestionState } from '../../domain/entity/question-state.enum';
import { Question } from '../../domain/entity/question.entity';
import { QuestionPort } from '../../domain/port/question.port';
import { QuestionQueryRepository } from './repository/question-query.repository';
import { QuestionRepository } from './repository/question.repository';

@Injectable()
export class QuestionAdapter implements QuestionPort {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly questionQueryRepository: QuestionQueryRepository,
  ) {}

  async createQuestion(
    memberIdentifier: number,
    questionCreateReqDto: QuestionCreateReqDto,
  ): Promise<number | undefined> {
    const question = await this.questionRepository.create({
      member_identifier: { identifier: memberIdentifier },
      ...questionCreateReqDto,
    });
    await this.questionRepository.save(question);
    return question.identifier;
  }

  async updateQuestion(
    identifier: number,
    questionUpdateReqDto: QuestionUpdateReqDto,
  ): Promise<number | undefined> {
    await this.questionRepository.update(
      { identifier: identifier },
      { ...questionUpdateReqDto },
    );
    return identifier;
  }

  async deleteQuestionByIdentifier(identifier: number): Promise<number> {
    await this.questionRepository.update(
      { identifier: identifier },
      { common: { is_deleted: 'deleted' } },
    );
    return identifier;
  }

  async findQuestionByIdentifier(
    identifier: number,
  ): Promise<Question | undefined> {
    const question = await this.questionRepository.findOne({
      identifier,
    });
    return question;
  }

  async findQuestionDetailByIdentifierAndMember(
    memberIdentifier: number,
    memberIsAdmin: boolean,
    identifier: number,
  ): Promise<QuestionDetailViewResDto | undefined> {
    const questionDetailView: QuestionDetailViewResDto = await this.questionQueryRepository.findQuestionDetailByIdentifier(
      memberIdentifier,
      memberIsAdmin,
      identifier,
    );
    return questionDetailView;
  }

  async findPaginatedQuestionByKeyword(
    skippedItems: number,
    perPage: number,
    keyword: string,
  ): Promise<QuestionViewResDto[] | undefined> {
    const questions: QuestionViewResDto[] = await this.questionQueryRepository.findPaginatedQuestionByKeyword(
      skippedItems,
      perPage,
      keyword,
    );
    return questions;
  }

  async findPaginatedQuestion(
    skippedItems: number,
    perPage: number,
  ): Promise<QuestionViewResDto[]> {
    const questions: QuestionViewResDto[] = await this.questionQueryRepository.findPaginatedQuestion(
      skippedItems,
      perPage,
    );
    return questions;
  }
  async findPaginatedQuestionByMemberIdentifier(
    memberIdentifier: number,
    skippedItems: number,
    perPage: number,
  ): Promise<QuestionHistoryResDto[] | undefined> {
    const questions: QuestionHistoryResDto[] = await this.questionQueryRepository.findPaginatedQuestionByMemberIdentifier(
      memberIdentifier,
      skippedItems,
      perPage,
    );
    return questions;
  }
  async updateQuestionState(
    postIdentifier: number,
    questionState: QuestionState,
  ): Promise<number | undefined> {
    await this.questionRepository.update(
      { identifier: postIdentifier },
      { state: questionState },
    );
    return postIdentifier;
  }

  async countQuestion(): Promise<number | undefined> {
    return await this.questionRepository.count({
      common: { is_deleted: RecordState.NONE },
    });
  }

  async countQuestionByMemberIdentifier(
    memberIdentifier: number,
  ): Promise<number | undefined> {
    const count: number = await this.questionRepository.count({
      common: { is_deleted: RecordState.NONE },
      member_identifier: { identifier: memberIdentifier },
    });
    return count;
  }
}
