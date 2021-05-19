import { Inject, Injectable } from '@nestjs/common';
import { FilePort, FILE_PORT } from '../../domain/port/file.port';

@Injectable()
export class FileDownloadService {
  constructor(@Inject(FILE_PORT) private readonly filePort: FilePort) {}

  async download(postIdentifier: number) {
    return;
  }
}
