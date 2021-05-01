import { Module } from '@nestjs/common';
import { ImpressionController } from './infrastructure/api/impression.controller';

@Module({ controllers: [ImpressionController] })
export class ImpressionModule {}
