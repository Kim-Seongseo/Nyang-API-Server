import { Inject, Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { BoardPort, BOARD_PORT } from '../../domain/port/board.port';
import { BoardUpdateReqDto } from '../dto/board-update.dto';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class BoardUpdateService {
  constructor(@Inject(BOARD_PORT) private readonly boardPort: BoardPort) {}

  @Transactional()
  async update(
    boardIdentifier: number,
    boardUpdateReqDto: BoardUpdateReqDto,
  ): Promise<number | undefined> {
    const identifier: number = await this.boardPort.updateBoard(
      boardIdentifier,
      boardUpdateReqDto,
    );
    if (!identifier) {
      throw new UnexpectedErrorException();
    }

    return identifier;
  }
}
