import { EntityRepository, Repository } from 'typeorm';
import { Permission } from '../../../domain/entity/permission.entity';

@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> {}
