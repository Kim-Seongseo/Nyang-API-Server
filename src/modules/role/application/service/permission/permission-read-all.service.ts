import { Injectable } from '@nestjs/common';
import { Permission } from 'src/modules/role/domain/entity/permission.entity';
import { PermissionRepository } from 'src/modules/role/infrastructure/persistence/repository/permission.repository';

@Injectable()
export class PermissionReadAllService {
  constructor(private permissionRepository: PermissionRepository) {}

  async readAll(): Promise<string[]> {
    const permissions: Pick<
      Permission,
      'permission_name'
    >[] = await this.permissionRepository.find();
    const result = permissions.map((permission) => {
      return permission['permission_name'];
    });
    return result;
  }
}
