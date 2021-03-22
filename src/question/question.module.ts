import { Module } from '@nestjs/common';
import { QuestionService } from './domain/service/question.service';
import { QuestionController } from './infra/api/question.controller';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
