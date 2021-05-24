import { Repository, EntityRepository } from 'typeorm';
import { Board } from 'src/modules/board/domain/entity/board.entity';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {}
