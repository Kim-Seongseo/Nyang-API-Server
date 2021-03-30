import { Module } from '@nestjs/common';
import { AnswerController } from 'src/modules/answer/infra/api/answer.controller';
import { AnswerService } from 'src/modules/answer/domain/service/answer.service';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
