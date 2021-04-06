import { Module } from '@nestjs/common';
import { FileController } from './infrastructure/api/file.controller';
import { FileService } from './application/service/file.service';

@Module({
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
