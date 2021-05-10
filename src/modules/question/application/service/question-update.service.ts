import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { QuestionRepository } from '../../infrastructure/repository/question.repository';
import { QuestionUpdateReqDto } from '../dto/question-update.dto';

@Injectable()
export class QuestionUpdateService {
  constructor(private questionRepository: QuestionRepository) {}

  async update(
    identifier: number,
    questionUpdateReqDto: QuestionUpdateReqDto,
  ): Promise<any | undefined> {
    try {
      await this.questionRepository.update(
        { identifier: identifier },
        { ...questionUpdateReqDto },
      );
    } catch (error) {
      throw new RequestTimeoutException();
    }
  }
}
