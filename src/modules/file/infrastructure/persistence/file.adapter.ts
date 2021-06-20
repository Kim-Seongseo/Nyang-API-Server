import { Injectable } from '@nestjs/common';
import { FilePort } from '../../domain/port/file.port';
import { FileRepository } from './repository/file.repository';

@Injectable()
export class FileAdapter implements FilePort {
  constructor(private readonly fileRepository: FileRepository) {}
  upload(files: string[], postIdentifier: number): Promise<number> {
    throw new Error('Method not implemented.');
  }
}
