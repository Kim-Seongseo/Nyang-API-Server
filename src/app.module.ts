import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { AnswerModule } from 'src/modules/answer/answer.module';
import { BoardModule } from 'src/modules/board/board.module';
import { CommentModule } from 'src/modules/comment/comment.module';
import { FileModule } from 'src/modules/file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './modules/role/role.module';
import { ImpressionModule } from 'src/modules/impression/impression.module';
import { QuestionModule } from './modules/question/question.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './modules/role/guard/role.guard';
import { AuthModule } from './modules/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) || 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        // logging: true,
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/images'),
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    QuestionModule,
    AnswerModule,
    BoardModule,
    CommentModule,
    FileModule,
    RoleModule,
    AuthModule,
    ImpressionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
