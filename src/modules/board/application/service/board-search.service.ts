import { Inject, Injectable } from '@nestjs/common';
import { NotExistException } from 'src/modules/answer/application/exception/not-exist.exception';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { BoardPort, BOARD_PORT } from '../../domain/port/board.port';
import { BoardType } from '../../domain/type/board.type';
import { BoardViewResDto } from '../dto/board-view.dto';

@Injectable()
export class BoardSearchService {
  constructor(@Inject(BOARD_PORT) private readonly boardPort: BoardPort) {}

  async searchBoard(
    perPage: number,
    skippedItems: number,
    keyword: string,
    category: BoardType,
  ): Promise<BoardViewResDto[] | undefined> {
    const boards: BoardViewResDto[] = await this.boardPort.findPaginatedBoardByKeyword(
      skippedItems,
      perPage,
      keyword,
      category,
    );
    if (!boards) {
      throw new NotExistException();
    }

    return boards;
  }
}
