import { Inject, Injectable } from '@nestjs/common';
import { BoardPort, BOARD_PORT } from '../../domain/port/board.port';
import { BoardType } from '../../domain/type/board.type';

@Injectable()
export class BoardUtilService {
  constructor(@Inject(BOARD_PORT) private readonly questionPort: BoardPort) {}

  async skip(page: number, perPage: number): Promise<number | undefined> {
    return (page - 1) * perPage;
  }

  async totalData(category: BoardType): Promise<number | undefined> {
    return await this.questionPort.countBoard(category);
  }

  async totalPage(
    totalData: number,
    perPage: number,
  ): Promise<number | undefined> {
    return Math.ceil(totalData / perPage);
  }
}
