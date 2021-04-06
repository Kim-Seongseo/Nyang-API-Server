import { Module } from '@nestjs/common';
import { AnswerController } from 'src/modules/answer/infrastructure/api/answer.controller';
import { AnswerService } from 'src/modules/answer/application/service/answer.service';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
