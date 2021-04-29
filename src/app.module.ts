import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { MemberModule } from 'src/modules/member/member.module';
import { AnswerModule } from 'src/modules/answer/answer.module';
import { BoardModule } from 'src/modules/board/board.module';
import { CommentModule } from 'src/modules/comment/comment.module';
import { FileModule } from 'src/modules/file/file.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './modules/mail/mail.module';
import { CertificationCodeModule } from './modules/certification-code/certification-code.module';
import { RoleModule } from './modules/role/role.module';

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
        logging: true,
      }),
    }),
    MemberModule,
    AnswerModule,
    BoardModule,
    CommentModule,
    FileModule,
    // AuthModule,
    // MailModule,
    // CertificationCodeModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
