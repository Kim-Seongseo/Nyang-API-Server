import { Injectable } from '@nestjs/common';
import { AnswerRepository } from '../../infrastructure/repository/answer.repository';
import { AnswerUpdateReqDto } from '../dto/answer-update.dto';
import { NotAIssuerException } from '../exception/not-a-issuer.exception';
import { NotExistException } from '../exception/Not-Exist.exception';

@Injectable()
export class AnswerUpdateService {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async update(
    identifier: number,
    memberIdentifier: number,
    answerUpdateReqDto: AnswerUpdateReqDto,
  ): Promise<number | undefined> {
    const comment = await this.answerRepository.findOne({ identifier });

    if (!comment) {
      throw new NotExistException();
    }
    if (comment.member_identifier.identifier !== memberIdentifier) {
      // querybuilder 이용하여 최적화 필요
      throw new NotAIssuerException();
    }

    comment.content = answerUpdateReqDto.content;
    await this.answerRepository.save(comment);
    return identifier;
  }
}
