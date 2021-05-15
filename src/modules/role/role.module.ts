import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { MemberModule } from '../member/member.module';
import { PermissionCreateService } from './application/service/permission/permission-create.service';
import { PermissionDeleteService } from './application/service/permission/permission-delete.service';
import { PermissionExistService } from './application/service/permission/permission-exist.service';
import { PermissionInitService } from './application/service/permission/permission-init.service';
import { PermissionReadAllService } from './application/service/permission/permission-read-all.service';
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
import { PERMISSION_PORT } from './domain/port/permissions.port';
import { RoleGuard } from './guard/role.guard';
import { RoleController } from './infrastructure/api/role.controller';
import { PersistenceAdapter } from './infrastructure/persistence/persistence.adapter';
import { PermissionQueryRepository } from './infrastructure/persistence/repository/permission.query.repository';
import { PermissionRepository } from './infrastructure/persistence/repository/permission.repository';
import { RoleMemberMappingRepository } from './infrastructure/persistence/repository/role-member-mapping.repository';
import { RolePermissionMappingRepository } from './infrastructure/persistence/repository/role-permission-mapping-repository';
import { RoleRepository } from './infrastructure/persistence/repository/role.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleRepository]),
    TypeOrmModule.forFeature([PermissionRepository]),
    TypeOrmModule.forFeature([PermissionQueryRepository]),
    TypeOrmModule.forFeature([RoleMemberMappingRepository]),
    TypeOrmModule.forFeature([RolePermissionMappingRepository]),
    AuthModule,
    MemberModule,
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
    PermissionReadAllService,
    PermissionReadByMemberService,
    RoleMemberMappingReadService,
    RolePermissionMappingExistService,
    RolePermissionMappingCreateService,
    RolePermissionMappingReadService,
    RolePermissionMappingInitService,
    RoleGuard,
    {
      provide: PERMISSION_PORT,
      useClass: PersistenceAdapter,
    },
  ],
  exports: [RoleGuard, PermissionReadByMemberService],
})
export class RoleModule {}
