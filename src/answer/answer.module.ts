import { Module } from '@nestjs/common';
import { AnswerController } from './infra/api/answer.controller';
import { AnswerService } from './domain/service/answer.service';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
