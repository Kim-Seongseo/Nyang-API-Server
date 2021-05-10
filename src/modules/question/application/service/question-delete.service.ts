import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { QuestionRepository } from '../../infrastructure/repository/question.repository';

@Injectable()
export class QuestionDeleteService {
  constructor(private questionRepository: QuestionRepository) {}

  async delete(identifier: number): Promise<any | undefined> {
    try {
      await this.questionRepository.update(
        { identifier: identifier },
        { common: { is_deleted: 'deleted' } },
      );
    } catch (error) {
      throw new RequestTimeoutException();
    }
  }
}
