import { EntityRepository, Repository } from 'typeorm';
import { RolePermissionMapping } from '../../domain/entity/role-permission-mapping.entity';

@EntityRepository(RolePermissionMapping)
export class RolePermissionMappingRepository extends Repository<RolePermissionMapping> {}
