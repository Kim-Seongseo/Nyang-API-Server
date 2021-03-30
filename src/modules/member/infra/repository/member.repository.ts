import { Repository, EntityRepository } from 'typeorm';
import { Member } from 'src/modules/member/domain/entity/member.entity';

@EntityRepository(Member)
export class MemberRepository extends Repository<Member> {}
