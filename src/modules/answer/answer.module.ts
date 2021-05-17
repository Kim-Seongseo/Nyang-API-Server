import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerController } from 'src/modules/answer/infrastructure/api/answer.controller';
import { ResponseModule } from '../response/response.module';
import { AnswerCreateService } from './application/service/answer-create.service';
import { AnswerDeleteService } from './application/service/answer-delete.service';
import { AnswerFindService } from './application/service/answer-find.service';
import { AnswerUpdateService } from './application/service/answer-update.service';
import { ANSWER_PORT } from './domain/port/answer.port';
import { AsnwerAdapter } from './infrastructure/persistence/answer.adapter';
import { AnswerQueryRepository } from './infrastructure/persistence/repository/answer-query.repository';
import { AnswerRepository } from './infrastructure/persistence/repository/answer.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnswerQueryRepository]),
    TypeOrmModule.forFeature([AnswerRepository]),
    ResponseModule,
  ],
  controllers: [AnswerController],
  providers: [
    AnswerCreateService,
    AnswerDeleteService,
    AnswerFindService,
    AnswerUpdateService,
    {
      provide: ANSWER_PORT,
      useClass: AsnwerAdapter,
    },
  ],
})
export class AnswerModule {}
