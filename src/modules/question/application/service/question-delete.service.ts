import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { QuestionRepository } from '../../infrastructure/repository/question.repository';

@Injectable()
export class QuestionDeleteService {
  constructor(private questionRepository: QuestionRepository) {}

  async delete(identifier: number): Promise<number | undefined> {
    try {
      await this.questionRepository.update(
        { identifier: identifier },
        { common: { is_deleted: 'deleted' } },
      );
      return identifier;
    } catch (error) {
      throw new RequestTimeoutException();
    }
  }
}
