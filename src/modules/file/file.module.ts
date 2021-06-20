import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileDownloadService } from './application/service/file-download.service';
import { FileUploadService } from './application/service/file-upload.service';
import { FILE_PORT } from './domain/port/file.port';
import { FileAdapter } from './infrastructure/persistence/file.adapter';
import { FileRepository } from './infrastructure/persistence/repository/file.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FileRepository])],
  providers: [
    FileUploadService,
    FileDownloadService,
    {
      provide: FILE_PORT,
      useClass: FileAdapter,
    },
  ],
  exports: [FileUploadService, FileDownloadService],
})
export class FileModule {}
