import { Injectable, NotFoundException } from '@nestjs/common';
import { classToPlain, plainToClass } from 'class-transformer';
import { QuestionRepository } from '../../infrastructure/repository/question.repository';
import { QuestionDetailViewResDto } from '../dto/question-detail.dto';

@Injectable()
export class QuestionDetailViewService {
  constructor(private questionRepository: QuestionRepository) {}

  async detailView(
    identifier: number,
  ): Promise<QuestionDetailViewResDto | undefined> {
    const result = await this.questionRepository
      .createQueryBuilder('q')
      .select('q.title', 'title')
      .addSelect('q.content', 'content')
      .addSelect('q.genus', 'genus')
      .addSelect('q.species', 'species')
      .addSelect('q.age', 'age')
      .addSelect('m.nickname', 'nickname')
      .addSelect('q.commonCreate_date', 'createDate')
      .innerJoin('member', 'm', 'q.memberIdentifierIdentifier = m.identifier')
      .where('q.identifier = :identifier', { identifier: identifier })
      .getRawMany();

    if (result.length == 0) throw new NotFoundException();
    return plainToClass(QuestionDetailViewResDto, classToPlain(result));
  }
}
