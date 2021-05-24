import { Inject, Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { BoardPort, BOARD_PORT } from '../../domain/port/board.port';
import { BoardType } from '../../domain/type/board.type';
import { BoardCreateReqDto } from '../dto/board-create.dto';

@Injectable()
export class BoardCreateService {
  constructor(@Inject(BOARD_PORT) private readonly boardPort: BoardPort) {}

  async create(
    memberIdentifier: number,
    boardCreateReqDto: BoardCreateReqDto,
    category: BoardType,
  ): Promise<number | undefined> {
    try {
      const identifier: number = await this.boardPort.createBoard(
        memberIdentifier,
        boardCreateReqDto,
        category,
      );
      return identifier;
    } catch (error) {
      console.log(error);
      throw new UnexpectedErrorException();
    }
  }
}
