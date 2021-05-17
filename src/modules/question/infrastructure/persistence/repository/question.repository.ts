import { Question } from 'src/modules/question/domain/entity/question.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {}
