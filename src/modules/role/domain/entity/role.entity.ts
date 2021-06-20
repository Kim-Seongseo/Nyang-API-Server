import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleType } from '../type/role-type.enum';

@Entity()
export class Role {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  identifier: number;

  /*properties*/
  @Column({
    type: 'enum',
    enum: RoleType,
    default: RoleType.MEMBER,
    unique: true,
  })
  role_name: RoleType;
}
