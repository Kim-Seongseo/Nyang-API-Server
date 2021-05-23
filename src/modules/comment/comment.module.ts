import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseModule } from '../response/response.module';
import { CommentCreateService } from './application/service/comment-create.service';
import { CommentDeleteService } from './application/service/comment-delete.service';
import { CommentViewService } from './application/service/comment-view.service';
import { CommentUpdateService } from './application/service/comment-update.service';
import { COMMENT_PORT } from './domain/port/comment.port';
import { CommentController } from './infrastructure/api/comment.controller';
import { CommentAdapter } from './infrastructure/persistence/comment.adapter';
import { CommentQueryRepository } from './infrastructure/persistence/repository/comment-query.repository';
import { CommentRepository } from './infrastructure/persistence/repository/comment.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentQueryRepository]),
    TypeOrmModule.forFeature([CommentRepository]),
    ResponseModule,
  ],
  controllers: [CommentController],
  providers: [
    CommentCreateService,
    CommentUpdateService,
    CommentDeleteService,
    CommentViewService,
    {
      provide: COMMENT_PORT,
      useClass: CommentAdapter,
    },
  ],
})
export class CommentModule {}
