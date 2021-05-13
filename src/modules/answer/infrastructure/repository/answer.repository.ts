import { Repository, EntityRepository } from 'typeorm';
import { Answer } from 'src/modules/answer/domain/entity/answer.entity';

@EntityRepository(Answer)
export class AnswerRepository extends Repository<Answer> {
  async getAnswersByPostIdentifier(
    postIdentifier: number,
    memberIdentifier: number,
  ) {
    this.createQueryBuilder().select();
    return;
  }
}
