import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerController } from 'src/modules/answer/infrastructure/api/answer.controller';
import { ResponseModule } from '../response/response.module';
import { AnswerCreateService } from './application/service/answer-create.service';
import { AnswerDeleteService } from './application/service/answer-delete.service';
import { AnswerFindService } from './application/service/answer-find.service';
import { AnswerUpdateService } from './application/service/answer-update.service';
import { AnswerRepository } from './infrastructure/repository/answer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerRepository]), ResponseModule],
  controllers: [AnswerController],
  providers: [
    AnswerCreateService,
    AnswerDeleteService,
    AnswerFindService,
    AnswerUpdateService,
  ],
})
export class AnswerModule {}
