import { Repository, EntityRepository } from 'typeorm';
import { Question } from 'src/modules/question/domain/entity/question.entity';

export class QuestionRepository extends Repository<Question> {}
