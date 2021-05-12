import { Injectable } from '@nestjs/common';
import { QuestionRepository } from '../../infrastructure/repository/question.repository';
import { QuestionCreateReqDto } from '../dto/question-enroll.dto';

@Injectable()
export class QuestionCreateService {
  constructor(private questionRepository: QuestionRepository) {}

  async create(
    memberIdentifier: number,
    questionCreateReqDto: QuestionCreateReqDto,
  ): Promise<number | undefined> {
    const question = await this.questionRepository.create({
      member_identifier: { identifier: memberIdentifier },
      ...questionCreateReqDto,
    });
    await this.questionRepository.save(question);
    return question.identifier;
  }
}
