import { EntityRepository, Repository } from 'typeorm';
import { RoleMemberMapping } from '../../domain/entity/role-member-mapping.entity';

@EntityRepository(RoleMemberMapping)
export class RoleMemberMappingRepository extends Repository<RoleMemberMapping> {}
