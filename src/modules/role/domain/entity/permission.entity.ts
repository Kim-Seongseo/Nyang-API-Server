import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PermissionType } from './permission-type.enum';
import { Role } from './role.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  identifier: number;

  /*relations*/
  @ManyToOne(() => Role, { lazy: true, cascade: false })
  authority: Role;

  /*properties*/
  @Column({ type: 'enum', enum: PermissionType })
  authority_detail_name: PermissionType;
}
