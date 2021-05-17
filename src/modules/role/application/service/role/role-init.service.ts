import { Injectable } from '@nestjs/common';
import { RoleType } from 'src/modules/role/domain/type/role-type.enum';
import { RoleInitializationFailed } from 'src/modules/role/application/exception/initialization-failed.exception';
import { RoleCreateService } from './role-create.service';

@Injectable()
export class RoleInitService {
  constructor(private roleCreateService: RoleCreateService) {}
  async init(): Promise<boolean | undefined> {
    try {
      const roleTypes = RoleType;
      for (const key in roleTypes) {
        await this.roleCreateService.create(key);
      }
    } catch (error) {
      throw new RoleInitializationFailed();
    }
    return true;
  }
}
