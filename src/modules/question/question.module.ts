import { Module } from '@nestjs/common';
import { QuestionService } from 'src/modules/question/domain/service/question.service';
import { QuestionController } from 'src/modules/question/infra/api/question.controller';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
