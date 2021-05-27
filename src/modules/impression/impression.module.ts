import { Module } from '@nestjs/common';
import { ResponseModule } from '../response/response.module';
import { ImpressionController } from './infrastructure/api/impression.controller';

@Module({ imports: [ResponseModule], controllers: [ImpressionController] })
export class ImpressionModule {}
