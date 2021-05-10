import { Injectable, NotFoundException } from "@nestjs/common";
import { classToPlain, plainToClass } from "class-transformer";
import { QuestionRepository } from "../../infrastructure/repository/question.repository";
import { QuestionSearchReqDto } from "../dto/question-search.dto";
import { QuestionViewResDto } from "../dto/question-view.dto";

@Injectable()
export class QuestionSearchService {
  constructor(private questionRepository: QuestionRepository) {}

  async searchQuestion(questionSearchReqDto: QuestionSearchReqDto): Promise<QuestionViewResDto | undefined> {
    const result = await this.questionRepository.createQueryBuilder('q')
      .select('q.identifier', 'identifier')
      .addSelect('q.title', 'title')
      .addSelect('q.content', 'content')
      .addSelect('q.species', 'species')
      .addSelect('m.nickname', 'nickname')
      .addSelect('q.state', 'state')
      .addSelect('count(a.identifier)', 'answerNum')
      .innerJoin('member', 'm', 'q.memberIdentifierIdentifier = m.identifier')
      .leftJoin('answer', 'a', 'a.questionIdentifierIdentifier = q.identifier')
      .where('q.commonIs_deleted = :none', { none: 'none' })
      .andWhere('q.title like :keyword', { keyword: `%${questionSearchReqDto.keyword}%` })
      .groupBy('q.identifier')
      .orderBy('q.identifier', 'DESC')
      .getRawMany();

    if(result.length == 0) throw new NotFoundException();
    return plainToClass(QuestionViewResDto, classToPlain(result));
  }
}
