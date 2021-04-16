import { Member } from 'src/modules/member/domain/entity/member.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class RoleMemberMapping {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  identifier: number;

  /*relations*/
  @ManyToOne(() => Role, { lazy: true, cascade: false })
  authority_group: Role;

  @ManyToOne(() => Member, { lazy: true, cascade: false })
  member: Member;
}
