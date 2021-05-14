import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';
import * as morgan from 'morgan';
import { customRequestMiddleware } from './modules/common/request/custom-request.middleware';
import { ExceptionInterceptor } from './modules/common/interceptor/exception.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    },
  });
  // app.setGlobalPrefix('')
  // 수신 데이터 유효성 검사

  // validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // validation을 위한 decorator가 붙어있지 않은 속성들은 제거
      forbidNonWhitelisted: true, // whitelist 설정을 켜서 걸러질 속성이 있다면 아예 요청 자체를 막도록 (400 에러)
      transform: true, // 요청에서 넘어온 자료들의 형변환
    }),
  );
  // morgan
  app.use(morgan('dev'));
  // swagger
  const config = new DocumentBuilder()
    .setTitle('Nyang API')
    .setDescription('Nyang dev Api docs')
    .setVersion('0.0.1')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'Token' },
      'token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  // custom middleware for custom request
  app.use(customRequestMiddleware); // request expansion for account info
  // exception interceptor
  app.useGlobalInterceptors(new ExceptionInterceptor());

  await app.listen(8092);
}
bootstrap();
