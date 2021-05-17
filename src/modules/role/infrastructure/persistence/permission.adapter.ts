import { Injectable } from '@nestjs/common';
import { Permission } from '../../domain/entity/permission.entity';
import { PermissionPort } from '../../domain/port/permission.port';
import { PermissionQueryRepository } from './repository/permission-query.repository';
import { PermissionRepository } from './repository/permission.repository';
import { PermissionType } from '../../domain/type/permission-type.enum';

@Injectable()
export class PermissionAdapter implements PermissionPort {
  constructor(
    private readonly permissionQueryRepository: PermissionQueryRepository,
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async findPermissionByName(
    permissionName: PermissionType,
  ): Promise<Permission[] | undefined> {
    return await this.permissionRepository.find({
      permission_name: permissionName,
    });
  }

  async deletePermissionByName(
    permissionName: PermissionType,
  ): Promise<number | undefined> {
    const permission: Permission = await this.permissionRepository.findOne({
      permission_name: permissionName,
    });
    const identifier = permission.identifier;
    await this.permissionRepository.delete({ identifier });
    return identifier;
  }

  async createPermission(
    permissionName: PermissionType,
  ): Promise<number | undefined> {
    const permission: Permission = await this.permissionRepository.create({
      permission_name: permissionName,
    });
    await this.permissionRepository.save(permission);
    return permission.identifier;
  }

  findPermissionsByMember(memberIdentifier: number): Promise<Permission[]> {
    return this.permissionQueryRepository.findPermissionsByMember(
      memberIdentifier,
    );
  }
}
