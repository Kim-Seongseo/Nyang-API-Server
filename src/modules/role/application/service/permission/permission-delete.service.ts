import { Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { PermissionType } from 'src/modules/role/domain/type/permission-type.enum';
import { PermissionRepository } from 'src/modules/role/infrastructure/repository/permission.repository';

@Injectable()
export class PermissionDeleteService {
  constructor(private permissionRepository: PermissionRepository) {}

  async delete(permissionName: string): Promise<boolean> | undefined {
    try {
      await this.permissionRepository.delete({
        permission_name: PermissionType[permissionName],
      });
      return true;
    } catch (error) {}
    throw new UnexpectedErrorException();
  }
}
