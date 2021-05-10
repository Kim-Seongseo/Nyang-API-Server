import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionController } from 'src/modules/question/infrastructure/api/question.controller';
import { QuestionCreateService } from './application/service/question-create.service';
import { QuestionDeleteService } from './application/service/question-delete.service';
import { QuestionDetailViewService } from './application/service/question-detail-view.service';
import { QuestionSearchService } from './application/service/question-search.service';
import { QuestionUpdateService } from './application/service/question-update.service';
import { QuestionViewService } from './application/service/question-view.service';
import { QuestionRepository } from './infrastructure/repository/question.repository';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionRepository])],
  controllers: [QuestionController],
  providers: [
    QuestionCreateService,
    QuestionUpdateService,
    QuestionDeleteService,
    QuestionViewService,
    QuestionDetailViewService,
    QuestionSearchService
  ],
})
export class QuestionModule {}
