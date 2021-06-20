import { classToPlain, plainToClass } from 'class-transformer';
import { RecordState } from 'src/modules/post/domain/entity/record-state.enum';
import { RoleMemberMappingFindResDto } from 'src/modules/role/application/dto/role-member-mapping-find.dto';
import { EntityRepository, Repository } from 'typeorm';
import { RoleMemberMapping } from '../../../domain/entity/role-member-mapping.entity';

@EntityRepository(RoleMemberMapping)
export class RoleMemberMappingQueryRepository extends Repository<RoleMemberMapping> {
  async findPaginatedRoleMemberMappingByKeyword(
    skippedItems: number,
    perPage: number,
    keyword: string,
  ): Promise<RoleMemberMappingFindResDto[] | undefined> {
    const query = this.createQueryBuilder('r_m')
      .select('r_m.identifier', 'identifier')
      .addSelect('m.account', 'account')
      .addSelect('m.nickname', 'nickname')
      .addSelect('m.date_register', 'date_register')
      .addSelect('r.role_name', 'role')
      .innerJoin('member', 'm', 'm.identifier = r_m.member and m.isDeleted = :isDeleted', { isDeleted : RecordState.NONE})
      .innerJoin('role', 'r', 'r.identifier = r_m.role');
    if (keyword) {
      query.where('m.account like :keyword', {
        keyword: `%${keyword}%`,
      });
    }
    const datas = await query
      .groupBy('m.identifier')
      .orderBy('m.date_register', 'DESC')
      .offset(skippedItems)
      .limit(perPage)
      .getRawMany();

    return datas.map((data) => {
      return plainToClass(RoleMemberMappingFindResDto, classToPlain(data));
    });
  }

  async countQuestion(): Promise<number | undefined>{
    const count = await this.createQueryBuilder('r_m')
    .innerJoin('member', 'm', 'm.identifier = r_m.member and m.isDeleted = :isDeleted', { isDeleted : RecordState.NONE})
    .getCount();
    
    return count;
  }
}
