import { Module } from '@nestjs/common';
import { CommentController } from './infra/api/comment.controller';
import { CommentService } from './domain/service/comment.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
