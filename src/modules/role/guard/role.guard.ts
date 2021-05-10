import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthDecodeAccessTokenService } from 'src/modules/auth/application/service/auth.decode-access-token.service';
import { CustomRequest } from 'src/modules/common/request/custom-request.interface';
import { PermissionReadByMemberService } from '../application/service/permission/permission-read-by-member.service';
import { PERMISSION_KEY } from '../decorator/role.decorator';
import { PermissionType } from '../domain/type/permission-type.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly authDecodeAccessTokenService: AuthDecodeAccessTokenService,
    private readonly permissionReadByMemberService: PermissionReadByMemberService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionType[]
    >(PERMISSION_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredPermissions.length) {
      return true;
    }

    const { headers } = context.switchToHttp().getRequest<CustomRequest>();
    const token = Array.isArray(headers.token)
      ? headers.token[0]
      : headers.token;

    const decodeToken = await this.authDecodeAccessTokenService.decodeAccessToken(
      token,
    );

    if (!token || Date.now() > decodeToken.exp) {
      // token is expired
      return false;
    }

    const identifier: number = decodeToken['identifier'];
    context.switchToHttp().getRequest<CustomRequest>().account = identifier;

    const permissions = await this.permissionReadByMemberService.readByMember(
      identifier,
    );
    console.log(permissions);

    for (const requiredPermission of requiredPermissions) {
      if (!permissions.includes(requiredPermission)) {
        // case: do not have a permission
        return false;
      }
    }
    return true;
  }
}
