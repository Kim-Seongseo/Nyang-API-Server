import { Injectable } from '@nestjs/common';
import { FileRepository } from 'src/modules/comment/infrastructure/repository/comment.repository';
import { FilePort } from '../../domain/port/file.port';

@Injectable()
export class FileAdapter implements FilePort {
  constructor(private readonly fileRepository: FileRepository) {}
  upload(files: string[], postIdentifier: number): Promise<number> {
    throw new Error('Method not implemented.');
  }
}
