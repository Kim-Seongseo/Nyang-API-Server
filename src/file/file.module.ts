import { Module } from '@nestjs/common';
import { FileController } from './infra/api/file.controller';
import { FileService } from './domain/service/file.service';

@Module({
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
