import { HttpException, HttpStatus } from '@nestjs/common';

export class NotAIssuer extends HttpException {
  constructor() {
    super('accessor is not a issuer', HttpStatus.FORBIDDEN);
  }
}
