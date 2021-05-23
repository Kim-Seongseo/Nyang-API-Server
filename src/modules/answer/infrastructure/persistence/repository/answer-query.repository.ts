import { Repository, EntityRepository } from 'typeorm';
import { Answer } from 'src/modules/answer/domain/entity/answer.entity';
import { RecordState } from 'src/modules/post/domain/entity/record-state.enum';
import { classToPlain, plainToClass } from 'class-transformer';
import { AnswerFindResDto } from '../../../application/dto/answer-find.dto';

@EntityRepository(Answer)
export class AnswerQueryRepository extends Repository<Answer> {
  async findAnswersByPostIdentifier(
    postIdentifier: number,
    memberIdentifier: number,
  ): Promise<AnswerFindResDto[] | undefined> {
    try {
      const datas = await this.createQueryBuilder('a')
        .select('a.identifier', 'identifier')
        .addSelect('a.content', 'content')
        .addSelect('a.select_state', 'select_state')
        .addSelect('a.create_date', 'create_date')
        .addSelect('m.identifier', 'memberIdentifier')
        .addSelect('m.nickname', 'nickname')
        .addSelect('f.path', 'profile_photo_path')
        .where('a.questionIdentifierIdentifier = :postIdentifier', {
          postIdentifier,
        })
        .innerJoin('a.member_identifier', 'm', 'm.isDeleted = :isDeleted', {
          isDeleted: RecordState.NONE,
        })
        .leftJoin('file', 'f', 'm.member_photo = f.identifier')
        .getRawMany();

      return datas.map((data) => {
        const isEditable =
          data.memberIdentifier === memberIdentifier ? true : false;
        return plainToClass(
          AnswerFindResDto,
          classToPlain({ ...data, isEditable }),
        );
      });
    } catch (error) {
      console.log(error);
    }
  }
}
