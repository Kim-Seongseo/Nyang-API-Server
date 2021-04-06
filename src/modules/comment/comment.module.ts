import { Module } from '@nestjs/common';
import { CommentController } from './infrastructure/api/comment.controller';
import { CommentService } from './application/service/comment.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
