import { Injectable } from '@nestjs/common';
import { Permission } from '../../domain/entity/permission.entity';
import {
  PermissionPort,
  PERMISSION_PORT,
} from '../../domain/port/permissions.port';
import { PermissionQueryRepository } from './repository/permission.query.repository';
import { PermissionRepository } from './repository/permission.repository';
import { RoleMemberMappingRepository } from './repository/role-member-mapping.repository';
import { RolePermissionMappingRepository } from './repository/role-permission-mapping-repository';
import { RoleRepository } from './repository/role.repository';

@Injectable()
export class PersistenceAdapter implements PermissionPort {
  constructor(
    private readonly permissionQueryRepository: PermissionQueryRepository,
    private readonly permissionRepository: PermissionRepository,
    private readonly roleMemberMappingRepository: RoleMemberMappingRepository,
    private readonly rolePermissionMappingRepository: RolePermissionMappingRepository,
    private readonly roleRepository: RoleRepository,
  ) {}
  findPermissionsByMember(memberIdentifier: number): Promise<Permission[]> {
    return this.permissionQueryRepository.findPermissionsByMember(
      memberIdentifier,
    );
  }
}
