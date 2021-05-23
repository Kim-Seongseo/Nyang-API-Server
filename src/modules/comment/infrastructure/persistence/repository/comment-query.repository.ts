import { Repository, EntityRepository } from "typeorm";
import { Comment } from "src/modules/comment/domain/entity/comment.entity";
import { CommentViewResDto } from "src/modules/comment/application/dto/comment-view.dto";
import { classToPlain, plainToClass } from "class-transformer";

@EntityRepository(Comment)
export class CommentQueryRepository extends Repository<Comment> {
  async findCommentByPostIdentifier(
    postIdentifier: number,
  ): Promise<CommentViewResDto[] | undefined> {
    const datas = await this.createQueryBuilder('c')
      .select('c.identifier', 'identifier')
      .addSelect('m.nickname', 'nickname')
      .addSelect('c.content', 'content')
      .addSelect('c.commonCreate_date', 'create_date')
      .addSelect('c.commonUpdate_date', 'update_date')
      .innerJoin('member', 'm', 'c.memberIdentifier = m.identifier')
      .where('c.boardIdentifierIdentifier = :postIdentifier', { postIdentifier })
      .orderBy('create_date', 'ASC')
      .getRawMany();
    
    return datas.map((data) => {
      const isEditable = (data.create_date).toString() !== (data.update_date).toString();
      return plainToClass(
        CommentViewResDto,
        classToPlain({ ...data, isEditable }),
      );
    });
  }
}
