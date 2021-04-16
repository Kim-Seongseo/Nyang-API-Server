import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';
import { Permission } from './permission.entity';

@Entity()
export class RolePermissionMapping {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  identifier: number;

  @ManyToOne(() => Role, { lazy: true, cascade: false })
  authority_group: Role;

  @ManyToOne(() => Permission, { lazy: true, cascade: false })
  authority: Permission;
}
