import { Module } from '@nestjs/common';
import { FileUploadService } from './application/service/file-upload.service';
import { FILE_PORT } from './domain/port/file.port';
import { FileController } from './infrastructure/api/file.controller';
import { FileAdapter } from './infrastructure/persistence/file.adapter';

@Module({
  controllers: [FileController],
  providers: [
    FileUploadService,
    {
      provide: FILE_PORT,
      useClass: FileAdapter,
    },
  ],
})
export class FileModule {}
