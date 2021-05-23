import { BadGatewayException, HttpException, Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { FileRepository } from '../../infrastructure/persistence/repository/file.repository';

@Injectable()
export class FileDownloadService {
  constructor(private readonly fileRepository: FileRepository) {}

  async download(identifier: number) {
    const file = await this.fileRepository.findOne({ identifier });
    if (!file) {
      throw new UnexpectedErrorException();
    }
    return file.path;
  }
}
