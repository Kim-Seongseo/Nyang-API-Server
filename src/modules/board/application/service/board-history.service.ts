import { Inject, Injectable } from '@nestjs/common';
import { BoardPort, BOARD_PORT } from '../../domain/port/board.port';
import { BoardType } from '../../domain/type/board.type';
import { BoardHistoryResDto } from '../dto/board-history.dto';

@Injectable()
export class BoardHistoryService {
  constructor(@Inject(BOARD_PORT) private readonly boardPort: BoardPort) {}

  async history(
    memberIdentifier: number,
    perPage: number,
    skippedItems: number,
    category: BoardType,
  ): Promise<BoardHistoryResDto[] | undefined> {
    const boards: BoardHistoryResDto[] = await this.boardPort.findPaginatedBoardByMemberIdentifier(
      memberIdentifier,
      skippedItems,
      perPage,
      category,
    );
    return boards;
  }
}
