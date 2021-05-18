import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RecordState } from 'src/modules/post/domain/entity/record-state.enum';
import { MemberType } from './member-type.enum';
import * as bcrypt from 'bcryptjs';

@Entity()
export class Member {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  identifier: number;

  /*properties*/
  @Column({ type: 'varchar', length: 20, unique: true })
  account: string;
  @Column({ type: 'varchar' })
  password: string;
  @Column({ type: 'varchar', length: 20 })
  name: string;
  @Column({ type: 'varchar', length: 20 })
  nickname: string;
  @Column({ type: 'varchar', length: 100 })
  email: string;
  @Column({ type: 'varchar', length: 20 })
  phone_number: string;
  @Column({
    type: 'enum',
    enum: MemberType,
    default: MemberType.MEMBER,
  })
  type: MemberType;
  @Column({ type: 'datetime' })
  date_birth: Date;
  @Column({ type: 'enum', enum: RecordState, default: RecordState.NONE })
  isDeleted: RecordState;
  @CreateDateColumn()
  date_register: Date;

  async comparePassword(cryptogram: string): Promise<boolean> {
    return cryptogram === this.password;
  }

  static async encryptToHash(prevPlainText: string): Promise<string> {
    const BCRYPT_ROUNDS = 10;
    const nextHash = bcrypt.hash(prevPlainText, BCRYPT_ROUNDS);
    return nextHash;
  }
}
