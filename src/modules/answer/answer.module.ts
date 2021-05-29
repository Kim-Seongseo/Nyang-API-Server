import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerController } from 'src/modules/answer/infrastructure/api/answer.controller';
import { QuestionModule } from '../question/question.module';
import { ResponseModule } from '../response/response.module';
import { AnswerAdoptService } from './application/service/answer-adopt.service';
import { AnswerCreateService } from './application/service/answer-create.service';
import { AnswerDeleteService } from './application/service/answer-delete.service';
import { AnswerFindService } from './application/service/answer-find.service';
import { AnswerHistoryService } from './application/service/answer-history.service';
import { AnswerUpdateService } from './application/service/answer-update.service';
import { AnswerUtilService } from './application/service/answer-util.service';
import { ANSWER_PORT } from './domain/port/answer.port';
import { AsnwerAdapter } from './infrastructure/persistence/answer.adapter';
import { AnswerQueryRepository } from './infrastructure/persistence/repository/answer-query.repository';
import { AnswerRepository } from './infrastructure/persistence/repository/answer.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnswerQueryRepository]),
    TypeOrmModule.forFeature([AnswerRepository]),
    ResponseModule,
    QuestionModule,
  ],
  controllers: [AnswerController],
  providers: [
    AnswerCreateService,
    AnswerDeleteService,
    AnswerFindService,
    AnswerUpdateService,
    AnswerAdoptService,
    AnswerUtilService,
    AnswerHistoryService,
    {
      provide: ANSWER_PORT,
      useClass: AsnwerAdapter,
    },
  ],
})
export class AnswerModule {}
