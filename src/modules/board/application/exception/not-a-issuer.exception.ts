import { HttpException, HttpStatus } from '@nestjs/common';

export class NotAIssuerException extends HttpException {
  constructor() {
    super('accessor is not a issuer', HttpStatus.FORBIDDEN);
  }
}
