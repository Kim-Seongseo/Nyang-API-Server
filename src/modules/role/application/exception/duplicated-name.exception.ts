import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicatedRoleException extends HttpException {
  constructor() {
    super('Duplicated role', HttpStatus.FORBIDDEN);
  }
}

export class DuplicatedPermissionException extends HttpException {
  constructor() {
    super('Duplicated permission', HttpStatus.FORBIDDEN);
  }
}

export class DuplicatedPermissionPerRoleException extends HttpException {
  constructor() {
    super('Duplicated permission per role', HttpStatus.FORBIDDEN);
  }
}
