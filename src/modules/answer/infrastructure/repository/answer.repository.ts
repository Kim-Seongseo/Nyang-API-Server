import { Repository, EntityRepository } from 'typeorm';
import { Answer } from 'src/modules/answer/domain/entity/answer.entity';

export class AnswerRepository extends Repository<Answer> {}
