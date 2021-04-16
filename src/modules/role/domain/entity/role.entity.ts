import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleType } from './role-type.enum';

@Entity()
export class Role {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  identifier: number;

  /*properties*/
  @Column({ type: 'enum', enum: RoleType, default: RoleType.MEMBER })
  authority_name: RoleType;
}
