import { Repository, EntityRepository } from 'typeorm';
import { Comment } from 'src/modules/comment/domain/entity/comment.entity';
import { CommentViewResDto } from 'src/modules/comment/application/dto/comment-view.dto';
import { classToPlain, plainToClass } from 'class-transformer';

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
}
