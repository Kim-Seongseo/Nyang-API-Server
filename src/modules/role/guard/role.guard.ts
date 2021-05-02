import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthDecodeAccessTokenService } from 'src/modules/auth/application/service/auth.decode-access-token.service';
import { PermissionReadByMemberService } from '../application/service/permission/permission-read-by-member.service';
import { RoleMemberMappingReadService } from '../application/service/role-member-mapping/role-member-mapping-read.service';
import { RolePermissionMappingReadService } from '../application/service/role-permission-mapping/role-permission-mapping-read.service';
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
    if (!requiredPermissions) {
      return true;
    }

    try {
      const { headers } = context.switchToHttp().getRequest<Request>();
      const decodeToken = await this.authDecodeAccessTokenService.decodeAccessToken(
        headers['token'],
      );
      console.log(decodeToken);

      const identifier: number = decodeToken['identifier'];

      const permissions = await this.permissionReadByMemberService.readByMember(
        identifier,
      );
      console.log(permissions);

      for (const requiredPermission of requiredPermissions) {
        if (!permissions.includes(requiredPermission)) {
          return false;
        }
      }
    } catch (error) {
      console.log(error);
    }
    console.log('done');
    return true;
  }
}
