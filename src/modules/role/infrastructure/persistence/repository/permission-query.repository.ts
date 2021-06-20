import { EntityRepository, Repository } from 'typeorm';
import { Permission } from '../../../domain/entity/permission.entity';
import { RoleMemberMapping } from '../../../domain/entity/role-member-mapping.entity';
import { RolePermissionMapping } from '../../../domain/entity/role-permission-mapping.entity';

@EntityRepository(Permission)
export class PermissionQueryRepository extends Repository<Permission> {
  async findPermissionsByMember(
    memberIdentifier: number,
  ): Promise<Permission[] | undefined> {
    return await this.createQueryBuilder('p')
      .leftJoin(
        RolePermissionMapping,
        'r_p',
        'r_p.permissionIdentifier = p.identifier',
      )
      .leftJoin(
        RoleMemberMapping,
        'r_m',
        'r_m.roleIdentifier = r_p.roleIdentifier',
      )
      .where('r_m.memberIdentifier = :memberIdentifier', { memberIdentifier })
      .getMany();
  }
}
