import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AuthorityDetailType } from './authority-detail-type.enum';
import { Authority } from './authority.entity';

@Entity()
export class AuthorityDetail {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  identifier: number;

  /*relations*/
  @ManyToOne(() => Authority, { lazy: true, cascade: false })
  authority: Authority;

  /*properties*/
  @Column({ type: 'enum', enum: AuthorityDetailType })
  authority_detail_name: AuthorityDetailType;
}
