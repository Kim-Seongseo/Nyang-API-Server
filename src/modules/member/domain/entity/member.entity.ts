import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RecordState } from 'src/modules/post/domain/entity/record-state.enum';
import * as bcrypt from 'bcryptjs';
import { Authority } from 'src/modules/authority/domain/entity/authority.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  identifier: number;

  /*relations*/
  @ManyToOne(() => Authority, { lazy: true, cascade: false })
  authority: Authority;

  /*properties*/
  @Column({ type: 'varchar', length: 20, unique: true })
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
  // @Column({
  //   type: 'enum',
  //   enum: MemberAuthority,
  //   default: MemberAuthority.MEMBER,
  // })
  // authority: MemberAuthority;
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
