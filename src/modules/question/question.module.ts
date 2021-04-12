import { Module } from '@nestjs/common';
import { QuestionService } from 'src/modules/question/application/service/question.service';
import { QuestionController } from 'src/modules/question/infrastructure/api/question.controller';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
