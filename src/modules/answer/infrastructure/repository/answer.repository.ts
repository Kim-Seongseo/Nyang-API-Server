import { Repository, EntityRepository } from 'typeorm';
import { Answer } from 'src/modules/answer/domain/entity/answer.entity';
import { RecordState } from 'src/modules/post/domain/entity/record-state.enum';
import { classToPlain, plainToClass } from 'class-transformer';
import { AnswerFindResDto } from '../../application/dto/answer-find.dto';

@EntityRepository(Answer)
export class AnswerRepository extends Repository<Answer> {
  async getAnswersByPostIdentifier(
    postIdentifier: number,
    memberIdentifier: number,
  ): Promise<AnswerFindResDto[] | undefined> {
    const datas = await this.createQueryBuilder('a')
      .select('a.identifier', 'identifier')
      .addSelect('a.content', 'content')
      .addSelect('a.select_state', 'select_state')
      .addSelect('a.create_date', 'create_date')
      .addSelect('m.identifier', 'memberIdentifier')
      .addSelect('m.nickname', 'nickname')
      .where('a.questionIdentifierIdentifier = :postIdentifier', {
        postIdentifier,
      })
      .innerJoinAndSelect(
        'a.member_identifier',
        'm',
        'm.isDeleted = :isDeleted',
        { isDeleted: RecordState.NONE },
      )
      .getRawMany();
    return datas.map((data) => {
      const isEditable =
        data.memberIdentifier === memberIdentifier ? true : false;
      return plainToClass(
        AnswerFindResDto,
        classToPlain({ ...data, isEditable }),
      );
    });
  }
}
