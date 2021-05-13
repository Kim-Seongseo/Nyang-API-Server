import { Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { PermissionType } from 'src/modules/role/domain/type/permission-type.enum';
import { PermissionRepository } from 'src/modules/role/infrastructure/repository/permission.repository';
import { DuplicatedPermissionException } from '../../exception/duplicated-name.exception';
import { PermissionExistService } from './permission-exist.service';

@Injectable()
export class PermissionCreateService {
  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly permissionExistService: PermissionExistService,
  ) {}
  async create(permissionName: string): Promise<boolean | undefined> {
    let role = null;
    if (await this.permissionExistService.isExist(permissionName)) {
      throw new DuplicatedPermissionException();
    }
    try {
      role = await this.permissionRepository.create({
        permission_name: PermissionType[permissionName],
      });
      await this.permissionRepository.save(role);
    } catch (error) {
      console.log(error);
      throw new UnexpectedErrorException();
    }
    return role.identifier;
  }
}
