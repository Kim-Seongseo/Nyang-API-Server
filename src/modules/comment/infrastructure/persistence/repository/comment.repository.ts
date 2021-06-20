import { Repository, EntityRepository } from 'typeorm';
import { Comment } from 'src/modules/comment/domain/entity/comment.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {}
