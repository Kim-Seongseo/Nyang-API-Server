import { Injectable } from '@nestjs/common';
import { QuestionRepository } from '../../infrastructure/repository/question.repository';

@Injectable()
export class QuestionUtilService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async skip(page: number, perPage: number): Promise<number | undefined> {
    return (page - 1) * perPage;
  }

  async total(): Promise<number | undefined> {
    return await this.questionRepository.count();
  }
}
