import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from '../../../comment/domain/entity/comment.entity';
@Entity()
export class Member {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  identifier: number;

  @Column({ type: 'varchar', length: 20 })
  account: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', length: 20 })
  name: string;

  @Column({ type: 'varchar', length: 20 })
  nickname: string;

  @Column({ type: 'varchar', length: 20 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  phone_number: string;

  @Column({ type: 'varchar', length: 20 })
  authority: string;

  @CreateDateColumn()
  date_register: Date;

  @Column({ type: 'datetime' })
  date_birth: Date;

  @Column({ type: 'varchar', length: 20 })
  isDeleted: string;
}
