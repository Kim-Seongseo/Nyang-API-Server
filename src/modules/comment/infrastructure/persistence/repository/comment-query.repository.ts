import { Repository, EntityRepository } from 'typeorm';
import { Comment } from 'src/modules/comment/domain/entity/comment.entity';
import { CommentViewResDto } from 'src/modules/comment/application/dto/comment-view.dto';
import { classToPlain, plainToClass } from 'class-transformer';
import { CommentHistoryResDto } from 'src/modules/comment/application/dto/commnet-history.dto';

@EntityRepository(Comment)
export class CommentQueryRepository extends Repository<Comment> {
  async findCommentByPostIdentifier(
    memberIdentifier: number,
    postIdentifier: number,
  ): Promise<CommentViewResDto[] | undefined> {
    const datas = await this.createQueryBuilder('c')
      .select('c.identifier', 'identifier')
      .addSelect('m.nickname', 'nickname')
      .addSelect('c.content', 'content')
      .addSelect('c.commonCreate_date', 'create_date')
      .addSelect('c.commonUpdate_date', 'update_date')
      .addSelect('m.identifier', 'member_identifier')
      .addSelect('f.path', 'profile_photo_path')
      .where('c.boardIdentifierIdentifier = :postIdentifier', {
        postIdentifier,
      })
      .innerJoin('member', 'm', 'c.memberIdentifier = m.identifier')
      .leftJoin('file', 'f', 'm.member_photo = f.identifier')
      .orderBy('create_date', 'ASC')
      .getRawMany();

    return datas.map((data) => {
      const isEditable =
        data.member_identifier === memberIdentifier.toString() ? true : false;
      return plainToClass(
        CommentViewResDto,
        classToPlain({ ...data, isEditable }),
      );
    });
  }

  async findPaginatedCommentByMemberIdentifier(
    memberIdentifier: number,
    skippedItems: number,
    perPage: number,
  ): Promise<CommentHistoryResDto[] | undefined> {
    const datas = await this.createQueryBuilder('c')
      .select('c.identifier', 'identifier')
      .addSelect('b.identifier', 'board_identifier')
      .addSelect('b.title', 'title')
      .addSelect('c.content', 'content')
      .addSelect('b.create_date', 'create_date')
      .innerJoin('board', 'b', 'b.identifier = c.board_identifier')
      .innerJoin('member', 'm', 'm.identifier = c.member')
      .where('m.identifier = :memberIdentifier', { memberIdentifier })
      .groupBy('c.identifier')
      .orderBy('c.create_date', 'DESC')
      .offset(skippedItems)
      .limit(perPage)
      .getRawMany();

    return datas.map((data) => {
      return plainToClass(CommentHistoryResDto, classToPlain(data));
    });
  }
}
