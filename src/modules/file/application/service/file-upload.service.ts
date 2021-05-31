import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { FileRepository } from 'src/modules/file/infrastructure/persistence/repository/file.repository';
import { FilesType } from '../../domain/type/files.type';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class FileUploadService {
  constructor(private readonly fileRepository: FileRepository) {}

  @Transactional()
  async upload(file: Express.Multer.File): Promise<number | undefined> {
    try {
      const extension = file['mimetype'].split('/').slice(1)[0];
      const savedFile = await this.fileRepository.create({
        name_original: file['filename'],
        size: file['size'],
        extension: FilesType[extension],
        path: process.env.SERVER_ADDRESS + '/' + file['path'],
      });
      await this.fileRepository.save(savedFile);
      return savedFile.identifier;
    } catch (error) {
      console.log(error);
      throw new UnexpectedErrorException();
    }
  }
}
