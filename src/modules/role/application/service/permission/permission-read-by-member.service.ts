import { Injectable } from '@nestjs/common';
import { Permission } from 'src/modules/role/domain/entity/permission.entity';
import { PermissionRepository } from 'src/modules/role/infrastructure/repository/permission.repository';

@Injectable()
export class PermissionReadByMemberService {
  constructor(private permissionRepository: PermissionRepository) {}

  async readByMember(memberIdentifier: number): Promise<string[]> {
    const permissionList = await this.permissionRepository.findPermissionsByMember(
      memberIdentifier,
    );
    const permissions: string[] = permissionList.map((permission) => {
      return permission.permission_name;
    });
    return permissions;
  }
}
