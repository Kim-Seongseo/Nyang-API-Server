import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthDecodeAccessTokenService } from 'src/modules/auth/application/service/auth.decode-access-token.service';
import { CustomRequest } from 'src/modules/common/request/custom-request.interface';
import { PermissionReadByMemberService } from '../application/service/permission/permission-read-by-member.service';
import { PERMISSION_KEY } from '../decorator/role.decorator';
import parseBearerToken from 'parse-bearer-token';
import { PermissionType } from '../domain/type/permission-type.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly authDecodeAccessTokenService: AuthDecodeAccessTokenService,
    private readonly permissionReadByMemberService: PermissionReadByMemberService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPermissions.length) {
      // 지정권한이 없을 경우
      return true;
    }

    const token = parseBearerToken(
      context.switchToHttp().getRequest<CustomRequest>(),
    );

    if (token) {
      // 토큰이 있는 경우
      const decodeToken = await this.authDecodeAccessTokenService.decodeAccessToken(
        token,
      );
      const identifier: number = decodeToken['identifier'];
      context.switchToHttp().getRequest<CustomRequest>().account = identifier;

      if (Date.now() / 1000 > decodeToken.exp) {
        // 토큰이 만료된 경우
        return false;
      }

      const permissions = await this.permissionReadByMemberService.readByMember(
        identifier,
      );

      for (const permission of permissions) {
        if (requiredPermissions.includes(permission)) {
          const type = permission.split('_')[1];
          if (type === 'manage') {
            context.switchToHttp().getRequest<CustomRequest>().isAdmin = true;
          }
          return true;
        }
      }
    }

    if (requiredPermissions.includes(PermissionType.OPTION)) {
      return true;
    }
    return false;
  }
}
