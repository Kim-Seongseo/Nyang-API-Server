import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicatedAccountException extends HttpException {
  constructor() {
    super('Duplicated account', HttpStatus.FORBIDDEN);
  }
}
