import { Permission } from '../entity/permission.entity';

export const PERMISSION_PORT = 'PERMISSION_PORT';

export interface PermissionPort {
  findPermissionsByMember(
    memberIdentifier: number,
  ): Promise<Permission[] | undefined>;
}
