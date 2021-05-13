import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PermissionInitService } from '../../application/service/permission/permission-init.service';
import { RolePermissionMappingInitService } from '../../application/service/role-permission-mapping/role-permission-mapping-init.service';
import { RoleInitService } from '../../application/service/role/role-init.service';
import { Permissions } from '../../decorator/role.decorator';

@ApiTags('권한 관리')
@Controller('role')
export class RoleController {
  constructor(
    private readonly roleInitService: RoleInitService,
    private readonly permissionInitService: PermissionInitService,
    private readonly rolePermissionMappingInitService: RolePermissionMappingInitService,
  ) {}

  @ApiOperation({ summary: '권한정보 초기화' })
  @Permissions()
  @Get('/init')
  async initRole(): Promise<boolean | undefined> {
    return (
      (await this.roleInitService.init()) &&
      (await this.permissionInitService.init()) &&
      (await this.rolePermissionMappingInitService.init())
    );
  }
}
