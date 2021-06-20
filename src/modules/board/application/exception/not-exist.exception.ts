import { HttpException, HttpStatus } from '@nestjs/common';

export class NotExistException extends HttpException {
  constructor() {
    super('The board does not exist', HttpStatus.FORBIDDEN);
  }
}
