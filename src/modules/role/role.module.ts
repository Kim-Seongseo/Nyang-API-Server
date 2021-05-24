import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { MemberModule } from '../member/member.module';
import { PermissionCreateService } from './application/service/permission/permission-create.service';
import { PermissionDeleteService } from './application/service/permission/permission-delete.service';
import { PermissionExistService } from './application/service/permission/permission-exist.service';
import { PermissionInitService } from './application/service/permission/permission-init.service';
import { PermissionReadByMemberService } from './application/service/permission/permission-read-by-member.service';
import { RoleMemberMappingReadService } from './application/service/role-member-mapping/role-member-mapping-read.service';
import { RolePermissionMappingCreateService } from './application/service/role-permission-mapping/role-permission-mapping-create.service';
import { RolePermissionMappingExistService } from './application/service/role-permission-mapping/role-permission-mapping-exist.service';
import { RolePermissionMappingInitService } from './application/service/role-permission-mapping/role-permission-mapping-init.service';
import { RolePermissionMappingReadService } from './application/service/role-permission-mapping/role-permission-mapping-read.service';
import { RoleCreateService } from './application/service/role/role-create.service';
import { RoleDeleteService } from './application/service/role/role-delete.service';
import { RoleExistService } from './application/service/role/role-exist.service';
import { RoleInitService } from './application/service/role/role-init.service';
import { RoleReadAllService } from './application/service/role/role-read-all.service';
import { RoleGuard } from './guard/role.guard';
import { RoleController } from './infrastructure/api/role.controller';
import { PermissionAdapter } from './infrastructure/persistence/permission.adapter';
import { PermissionQueryRepository } from './infrastructure/persistence/repository/permission-query.repository';
import { PermissionRepository } from './infrastructure/persistence/repository/permission.repository';
import { RoleMemberMappingRepository } from './infrastructure/persistence/repository/role-member-mapping.repository';
import { RolePermissionMappingRepository } from './infrastructure/persistence/repository/role-permission-mapping-repository';
import { RoleRepository } from './infrastructure/persistence/repository/role.repository';
import {
  PERMISSION_PORT,
  ROLE_MEMBER_MAPPING_PORT,
  ROLE_PERMISSION_MAPPING_PORT,
  ROLE_PORT,
} from './domain/port/port.constant';
import { RoleMemberMappingAdapter } from './infrastructure/persistence/role-member-mapping.adapter';
import { RoleAdapter } from './infrastructure/persistence/role.adapter';
import { RolePermissionMappingAdapter } from './infrastructure/persistence/role-permission-mapping.adapter';
import { RoleMemberMappingCreateService } from './application/service/role-member-mapping/role-member-mapping-create.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([RoleRepository]),
    TypeOrmModule.forFeature([PermissionRepository]),
    TypeOrmModule.forFeature([PermissionQueryRepository]),
    TypeOrmModule.forFeature([RoleMemberMappingRepository]),
    TypeOrmModule.forFeature([RolePermissionMappingRepository]),
    AuthModule,
    forwardRef(() => MemberModule),
    // MemberModule,
  ],
  controllers: [RoleController],
  providers: [
    RoleExistService,
    RoleCreateService,
    RoleDeleteService,
    RoleInitService,
    RoleReadAllService,
    PermissionExistService,
    PermissionCreateService,
    PermissionDeleteService,
    PermissionInitService,
    PermissionReadByMemberService,
    RoleMemberMappingCreateService,
    RoleMemberMappingReadService,
    RolePermissionMappingExistService,
    RolePermissionMappingCreateService,
    RolePermissionMappingReadService,
    RolePermissionMappingInitService,
    RoleGuard,
    {
      provide: ROLE_PORT,
      useClass: RoleAdapter,
    },
    {
      provide: PERMISSION_PORT,
      useClass: PermissionAdapter,
    },
    {
      provide: ROLE_MEMBER_MAPPING_PORT,
      useClass: RoleMemberMappingAdapter,
    },
    {
      provide: ROLE_PERMISSION_MAPPING_PORT,
      useClass: RolePermissionMappingAdapter,
    },
  ],
  exports: [
    RoleGuard,
    PermissionReadByMemberService,
    RoleMemberMappingCreateService,
  ],
})
export class RoleModule {}
