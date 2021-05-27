import { Injectable } from '@nestjs/common';
import { QuestionDetailViewResDto } from '../../application/dto/question-detail.dto';
import { QuestionCreateReqDto } from '../../application/dto/question-enroll.dto';
import { QuestionUpdateReqDto } from '../../application/dto/question-update.dto';
import { QuestionViewResDto } from '../../application/dto/question-view.dto';
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
  async countQuestion(): Promise<number | undefined> {
    return await this.questionRepository.count();
  }

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

  async updateQuestionState(postIdentifier: number): Promise<void | undefined> {
    await this.questionQueryRepository.updateQuestionState(postIdentifier);
  }
}
