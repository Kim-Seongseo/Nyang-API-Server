import { Repository, EntityRepository } from 'typeorm';
import { Answer } from 'src/modules/answer/domain/entity/answer.entity';
import { RecordState } from 'src/modules/post/domain/entity/record-state.enum';
import { classToPlain, plainToClass } from 'class-transformer';
import { AnswerFindResDto } from '../../../application/dto/answer-find.dto';
import { AnswerHistoryResDto } from 'src/modules/answer/application/dto/answer-history.dto';
import { AnswerState } from 'src/modules/answer/domain/type/answer-state.type';

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
      
      return await Promise.all(datas.map(async (data) => {
        const isEditable =
          data.memberIdentifier === memberIdentifier ? true : false;
        const adopted_number = await this.findAdoptedRecordByIdentifier(data.memberIdentifier);
        return plainToClass(
          AnswerFindResDto,
          classToPlain({ ...data, isEditable, adopted_number }),
        );
      }));
    } catch (error) {
      console.log(error);
    }
  }

  async findPaginatedAnswerByMemberIdentifier(
    memberIdentifier: number,
    skippedItems: number,
    perPage: number,
  ): Promise<AnswerHistoryResDto[] | undefined> {
    const datas = await this.createQueryBuilder('a')
      .select('a.identifier', 'identifier')
      .addSelect('q.identifier', 'question_identifier')
      .addSelect('q.title', 'question_title')
      .addSelect('a.content', 'content')
      .addSelect('a.select_state', 'state')
      .addSelect('a.create_date', 'created_date')
      .innerJoin('question', 'q', 'q.identifier = a.question_identifier')
      .innerJoin('member', 'm', 'm.identifier = a.member_identifier')
      .where('m.identifier = :memberIdentifier', { memberIdentifier })
      .groupBy('a.identifier')
      .orderBy('a.create_date', 'DESC')
      .offset(skippedItems)
      .limit(perPage)
      .getRawMany();

    return datas.map((data) => {
      return plainToClass(AnswerHistoryResDto, classToPlain(data));
    });
  }

  async findAdoptedRecordByIdentifier(memberIdentifier: number): Promise<number | undefined>{
    const data = await this.createQueryBuilder('a')
    .select('count(a.identifier)','record')
    .innerJoin('member','m','m.identifier = a.member_identifier')
    .where('m.identifier = :memberIdentifier', {memberIdentifier})
    .andWhere('a.select_state = :state',{state: AnswerState.SELECTED})  
    .getRawOne();

    const record = data.record;
    return record;
  }
}
