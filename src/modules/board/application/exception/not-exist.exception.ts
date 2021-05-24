import { HttpException, HttpStatus } from '@nestjs/common';

export class NotExistException extends HttpException {
  constructor() {
    super('The comment does not exist', HttpStatus.FORBIDDEN);
  }
}
