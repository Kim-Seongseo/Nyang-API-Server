import { Repository, EntityRepository } from 'typeorm';
import { File } from 'src/modules/file/domain/entity/file.entity';

@EntityRepository(File)
export class FileRepository extends Repository<File> {}
