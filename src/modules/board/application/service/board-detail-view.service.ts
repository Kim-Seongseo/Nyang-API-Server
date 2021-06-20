import { Inject, Injectable } from '@nestjs/common';
import { NotExistException } from 'src/modules/answer/application/exception/not-exist.exception';
import { BoardPort, BOARD_PORT } from '../../domain/port/board.port';
import { BoardType } from '../../domain/type/board.type';
import { BoardDetailViewResDto } from '../dto/board-detail.dto';

@Injectable()
export class BoardDetailViewService {
  constructor(@Inject(BOARD_PORT) private readonly boardPort: BoardPort) {}

  async detailView(
    memberIdentifier: number,
    memberIsAdmin: boolean,
    identifier: number,
    category: BoardType,
  ): Promise<BoardDetailViewResDto | undefined> {
    const board: BoardDetailViewResDto = await this.boardPort.findBoardDetailByIdentifierAndMember(
      memberIdentifier,
      memberIsAdmin,
      identifier,
    );
    if (!board) {
      throw new NotExistException();
    }

    return board;
  }
}
