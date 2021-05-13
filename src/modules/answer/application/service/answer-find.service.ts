import { Injectable } from '@nestjs/common';
import { AnswerRepository } from '../../infrastructure/repository/answer.repository';

@Injectable()
export class AnswerFindService {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async find(postIdentifier: number, memberIdentifier: number) {
    return;
  }
}
