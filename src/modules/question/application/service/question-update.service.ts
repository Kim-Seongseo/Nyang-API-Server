import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { QuestionRepository } from '../../infrastructure/repository/question.repository';
import { QuestionUpdateReqDto } from '../dto/question-update.dto';

@Injectable()
export class QuestionUpdateService {
  constructor(private questionRepository: QuestionRepository) {}

  async update(
    identifier: number,
    questionUpdateReqDto: QuestionUpdateReqDto,
  ): Promise<number | undefined> {
    try {
      await this.questionRepository.update(
        { identifier: identifier },
        { ...questionUpdateReqDto },
      );
      return identifier;
    } catch (error) {
      throw new RequestTimeoutException();
    }
  }
}
