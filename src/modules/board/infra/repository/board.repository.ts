import { Repository, EntityRepository } from 'typeorm';
import { Board } from 'src/modules/board/domain/entity/board.entity';

export class BoardRepository extends Repository<Board> {}
