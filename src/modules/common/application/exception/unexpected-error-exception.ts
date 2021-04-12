import { HttpException, HttpStatus } from '@nestjs/common';

export class UnexpectedErrorException extends HttpException {
  constructor() {
    super('An unexpected error occurred.', HttpStatus.NOT_ACCEPTABLE);
  }
}
