import { Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { AnswerRepository } from '../../infrastructure/repository/answer.repository';
import { AnswerCreateReqDto } from '../dto/answer-create.dto';

@Injectable()
export class AnswerCreateService {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async create(
    memberIdentifier: number,
    answerCreateReqDto: AnswerCreateReqDto,
  ): Promise<number | undefined> {
    try {
      const comment = await this.answerRepository.create({
        member_identifier: { identifier: memberIdentifier },
        question_identifier: { identifier: answerCreateReqDto.postIdentifier },
        content: answerCreateReqDto.content,
      });

      await this.answerRepository.save(comment);
      return comment.identifier;
    } catch (error) {
      throw new UnexpectedErrorException();
    }
  }
}
