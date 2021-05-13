import { Injectable } from '@nestjs/common';
import { QuestionRepository } from '../../infrastructure/repository/question.repository';
import { QuestionViewResDto } from '../dto/question-view.dto';

@Injectable()
export class QuestionViewService {
  constructor(private questionRepository: QuestionRepository) {}

  async paginatedView(
    perPage: number,
    skippedItems: number,
  ): Promise<QuestionViewResDto[] | undefined> {
    const questions: QuestionViewResDto[] = await this.questionRepository.getPaginatedQuestion(
      skippedItems,
      perPage,
    );
    return questions;
  }
  // async view(): Promise<QuestionViewResDto | undefined> {
  //   const result = await this.questionRepository
  //     .createQueryBuilder('q')
  //     .select('q.identifier', 'identifier')
  //     .addSelect('q.title', 'title')
  //     .addSelect('q.content', 'content')
  //     .addSelect('q.species', 'species')
  //     .addSelect('m.nickname', 'nickname')
  //     .addSelect('q.state', 'state')
  //     .addSelect('count(a.identifier)', 'answerNum')
  //     .innerJoin('member', 'm', 'q.memberIdentifierIdentifier = m.identifier')
  //     .leftJoin('answer', 'a', 'a.questionIdentifierIdentifier = q.identifier')
  //     .where('q.commonIs_deleted = :none', { none: 'none' })
  //     .groupBy('q.identifier')
  //     .orderBy('q.identifier', 'DESC')
  //     .getRawMany();

  //   if (result.length == 0) throw new NotFoundException();
  //   return plainToClass(QuestionViewResDto, classToPlain(result));
  // }
}
