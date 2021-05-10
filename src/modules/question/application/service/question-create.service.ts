import { Injectable } from "@nestjs/common";
import { QuestionRepository } from "../../infrastructure/repository/question.repository";
import { QuestionCreateReqDto } from "../dto/question-enroll.dto";

@Injectable()
export class QuestionCreateService {
  constructor(private questionRepository: QuestionRepository) {}

  async create( questionCreateReqDto: QuestionCreateReqDto ): Promise<any | undefined> {
    const question = await this.questionRepository.create({
      ...questionCreateReqDto,
    });
    await this.questionRepository.save(question);
  }
}
