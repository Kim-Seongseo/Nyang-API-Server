import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AuthorityType } from './authority-type.enum';

@Entity()
export class Authority {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  identifier: number;

  /*properties*/
  @Column({ type: 'enum', enum: AuthorityType, default: AuthorityType.MEMBER })
  authority_name: AuthorityType;
}
