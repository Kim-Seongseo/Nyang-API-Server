import { Answer } from 'src/modules/answer/domain/entity/answer.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Answer)
export class AnswerRepository extends Repository<Answer> {}
