import { Role } from '../entity/role.entity';

export interface RolePort {
  findAll(): Promise<Role[] | undefined>;
  createRole(roleName: string): Promise<number | undefined>;
  deleteRoleByName(roleName: string): Promise<number | undefined>;
  findRoleByName(roleName: string): Promise<Role | undefined>;
}
