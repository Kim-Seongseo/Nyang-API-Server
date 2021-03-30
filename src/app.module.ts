import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { MemberModule } from 'src/modules/member/member.module';
import { AnswerModule } from 'src/modules/answer/answer.module';
import { BoardModule } from 'src/modules/board/board.module';
import { CommentModule } from 'src/modules/comment/comment.module';
import { FileModule } from 'src/modules/file/file.module';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    MemberModule,
    AnswerModule,
    BoardModule,
    CommentModule,
    FileModule,
    AuthModule,
    TypeOrmModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
