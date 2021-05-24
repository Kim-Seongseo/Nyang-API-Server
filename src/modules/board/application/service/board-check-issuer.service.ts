import { Inject, Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { BoardPort, BOARD_PORT } from '../../domain/port/board.port';

@Injectable()
export class BoardCheckIssuerService {
  constructor(@Inject(BOARD_PORT) private readonly boardPort: BoardPort) {}

  async isIssuer(
    memberIdentifier: number,
    isAdmin: boolean,
    questionIdentifier: number,
  ): Promise<boolean | undefined> {
    try {
      const issuer: number = await this.boardPort.findIssuerByIdentifier(
        questionIdentifier,
      );

      return issuer === memberIdentifier || isAdmin;
    } catch (error) {
      console.log(error);
      throw new UnexpectedErrorException();
    }
  }
}
