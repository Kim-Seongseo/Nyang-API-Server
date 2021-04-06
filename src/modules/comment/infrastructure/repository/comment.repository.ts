import { Repository, EntityRepository } from 'typeorm';
import { Comment } from 'src/modules/comment/domain/entity/comment.entity';

export class FileRepository extends Repository<Comment> {}
