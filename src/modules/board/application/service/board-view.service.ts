import { Inject, Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { BoardPort, BOARD_PORT } from '../../domain/port/board.port';
import { BoardType } from '../../domain/type/board.type';
import { BoardViewResDto } from '../dto/board-view.dto';

@Injectable()
export class BoardViewService {
  constructor(@Inject(BOARD_PORT) private readonly boardPort: BoardPort) {}

  async paginatedView(
    perPage: number,
    skippedItems: number,
    category: BoardType,
  ): Promise<BoardViewResDto[] | undefined> {
    try {
      const boards: BoardViewResDto[] = await this.boardPort.findPaginatedBoardByKeyword(
        skippedItems,
        perPage,
        null,
        category,
      );
      return boards;
    } catch (error) {
      console.log(error);
      throw new UnexpectedErrorException();
    }
  }
}
