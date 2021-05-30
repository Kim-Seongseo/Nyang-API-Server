import { HttpException, HttpStatus } from '@nestjs/common';

export class NotExistException extends HttpException {
  constructor() {
    super('The answer does not exist', HttpStatus.FORBIDDEN);
  }
}
