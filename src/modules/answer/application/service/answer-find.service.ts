import { Injectable } from '@nestjs/common';
import { AnswerRepository } from '../../infrastructure/repository/answer.repository';
import { AnswerFindResDto } from '../dto/answer-find.dto';
import { NotExistException } from '../exception/Not-Exist.exception';

@Injectable()
export class AnswerFindService {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async find(
    postIdentifier: number,
    memberIdentifier: number,
  ): Promise<AnswerFindResDto[] | undefined> {
    const answers = await this.answerRepository.getAnswersByPostIdentifier(
      postIdentifier,
      memberIdentifier,
    );
    if (!answers) {
      throw new NotExistException();
    }
    return answers;
  }
}
