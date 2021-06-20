import { Inject, Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { BoardPort, BOARD_PORT } from '../../domain/port/board.port';
import { Transactional } from 'typeorm-transactional-cls-hooked';
@Injectable()
export class BoardDeleteService {
  constructor(@Inject(BOARD_PORT) private readonly boardPort: BoardPort) {}

  @Transactional()
  async delete(boardIdentifier: number): Promise<number | undefined> {
    const identifier: number = await this.boardPort.deleteBoardbyIdentifier(
      boardIdentifier,
    );
    if (!identifier) {
      throw new UnexpectedErrorException();
    }

    return identifier;
  }
}
