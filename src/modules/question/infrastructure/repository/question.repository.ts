import { Repository, EntityRepository } from 'typeorm';
import { Question } from 'src/modules/question/domain/entity/question.entity';
import { QuestionDetailViewResDto } from '../../application/dto/question-detail.dto';
import { classToPlain, plainToClass } from 'class-transformer';
import { QuestionIssuer } from '../../domain/type/question-issuer.type';

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {
  async getQuestionDetailByIdentifier(
    memberIdentifier: number,
    memberIsAdmin: boolean,
    identifier: number,
  ): Promise<QuestionDetailViewResDto | undefined> {
    const data = await this.createQueryBuilder('q')
      .select('q.title', 'title')
      .addSelect('q.content', 'content')
      .addSelect('q.genus', 'genus')
      .addSelect('q.species', 'species')
      .addSelect('q.age', 'age')
      .addSelect('m.nickname', 'nickname')
      .addSelect('q.commonCreate_date', 'createDate')
      .addSelect('m.identifier', 'memberIdentifier')
      .innerJoin('member', 'm', 'q.memberIdentifierIdentifier = m.identifier')
      .where('q.identifier = :identifier', { identifier })
      .getRawOne();

    console.log(data);
    const questionDetailViewResDto = plainToClass(
      QuestionDetailViewResDto,
      classToPlain(data),
    );
    if (data.memberIdentifier === memberIdentifier || memberIsAdmin)
      questionDetailViewResDto.isIssuer = QuestionIssuer.ISSUER;
    return questionDetailViewResDto;
  }
}
