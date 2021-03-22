import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './member/member.module';
import { AnswerModule } from './answer/answer.module';
import { BoardModule } from './board/board.module';
import { CommentModule } from './comment/comment.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    MembersModule,
    AnswerModule,
    BoardModule,
    CommentModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
