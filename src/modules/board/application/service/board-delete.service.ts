import { Inject, Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { BoardPort, BOARD_PORT } from '../../domain/port/board.port';

@Injectable()
export class BoardDeleteService {
  constructor(@Inject(BOARD_PORT) private readonly boardPort: BoardPort) {}

  async delete(boardIdentifier: number): Promise<number | undefined> {
    try {
      const identifier: number = await this.boardPort.deleteBoardbyIdentifier(
        boardIdentifier,
      );
      return identifier;
    } catch (error) {
      console.log(error);
      throw new UnexpectedErrorException();
    }
  }
}
