import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PermissionType } from '../type/permission-type.enum';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  identifier: number;

  /*properties*/
  @Column({ type: 'enum', enum: PermissionType, unique: true })
  permission_name: PermissionType;
}
