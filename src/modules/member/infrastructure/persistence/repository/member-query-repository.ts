import { classToPlain, plainToClass } from 'class-transformer';
import { MemberReadResDto } from 'src/modules/member/application/dto/member-read.dto';
import { Member } from 'src/modules/member/domain/entity/member.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Member)
export class MemberQueryRepository extends Repository<Member> {
  async findMemberByIdentifier(
    identifier: number,
  ): Promise<MemberReadResDto | undefined> {
    const data = await this.createQueryBuilder('m')
      .select('m.account', 'account')
      .addSelect('m.name', 'name')
      .addSelect('m.nickname', 'nickname')
      .addSelect('m.email', 'email')
      .addSelect('m.phone_number', 'phone_number')
      .addSelect('m.date_birth', 'date_birth')
      .addSelect('f.path', 'profile_photo_path')
      .leftJoin('file', 'f', 'm.memberPhotoIdentifier = f.identifier')
      .where('m.identifier = :identifier', { identifier })
      .getRawOne();
    return plainToClass(MemberReadResDto, classToPlain(data));
  }

  async findRoleByIdentifier(identifier: number): Promise<string | undefined> {
    const data = await this.createQueryBuilder('m')
      .select('r.role_name', 'role_name')
      .where('m.identifier = :identifier', { identifier })
      .innerJoin(
        'role_member_mapping',
        'r_m',
        'r_m.memberIdentifier = m.identifier',
      )
      .innerJoin('role', 'r', 'r.identifier = r_m.roleIdentifier')
      .getRawOne();
    return data.role_name;
  }
}
