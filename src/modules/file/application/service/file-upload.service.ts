import { Inject, Injectable } from '@nestjs/common';
import { FilePort, FILE_PORT } from '../../domain/port/file.port';

@Injectable()
export class FileUploadService {
  constructor(@Inject(FILE_PORT) private readonly filePort: FilePort) {}

  async upload(
    files: string[],
    postIdentifier: number,
  ): Promise<number | undefined> {
    return;
  }
}
