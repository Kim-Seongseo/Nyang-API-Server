import { Injectable } from '@nestjs/common';
import { MemberIdentifier } from 'src/modules/member/decorator/member-identifier.decorator';
import { AnswerCreateReqDto } from '../../application/dto/answer-create.dto';
import { AnswerFindResDto } from '../../application/dto/answer-find.dto';
import { Answer } from '../../domain/entity/answer.entity';
import { AnswerPort } from '../../domain/port/answer.port';
import { AnswerQueryRepository } from './repository/answer-query.repository';
import { AnswerRepository } from './repository/answer.repository';

@Injectable()
export class AsnwerAdapter implements AnswerPort {
  constructor(
    private readonly answerQueryRepository: AnswerQueryRepository,
    private readonly answerRepository: AnswerRepository,
  ) {}
  async createAnswer(
    memberIdentifier: number,
    answerCreateReqDto: AnswerCreateReqDto,
  ): Promise<number | undefined> {
    const answer = await this.answerQueryRepository.create({
      member_identifier: { identifier: memberIdentifier },
      question_identifier: { identifier: answerCreateReqDto.postIdentifier },
      content: answerCreateReqDto.content,
    });

    await this.answerQueryRepository.save(answer);
    return answer.identifier;
  }
  async deleteAnswerByIdentifier(
    identifier: number,
  ): Promise<number | undefined> {
    await this.answerQueryRepository.delete({ identifier });
    return identifier;
  }
  async findAnswerByIdentifier(
    identifier: number,
  ): Promise<Answer | undefined> {
    const answer = await this.answerQueryRepository.findOne({ identifier });
    return answer;
  }
  async findAnswersByPostIdentifier(
    postIdentifier: number,
    memberIdentifier: number,
  ): Promise<AnswerFindResDto[] | undefined> {
    const answers = await this.answerQueryRepository.findAnswersByPostIdentifier(
      postIdentifier,
      memberIdentifier,
    );
    return answers;
  }
  async saveAnswer(answer: Answer): Promise<number | undefined> {
    await this.answerQueryRepository.save(answer);
    return answer.identifier;
  }
}
