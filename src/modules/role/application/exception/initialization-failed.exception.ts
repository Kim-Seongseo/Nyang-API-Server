import { HttpException, HttpStatus } from '@nestjs/common';

export class RoleInitializationFailed extends HttpException {
  constructor() {
    super('Role initialization failed', HttpStatus.FORBIDDEN);
  }
}

export class PermissionInitializationFailed extends HttpException {
  constructor() {
    super('Permission initialization failed', HttpStatus.FORBIDDEN);
  }
}

export class PermissionPerRoleInitializationFailed extends HttpException {
  constructor() {
    super('Permission per Role initialization failed', HttpStatus.FORBIDDEN);
  }
}
