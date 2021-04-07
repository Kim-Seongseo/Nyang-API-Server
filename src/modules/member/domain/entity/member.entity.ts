import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MemberAuthority } from 'src/modules/member/domain/entity/member-authority.enum';
import { RecordState } from 'src/modules/common/domain/entity/record-state.enum';

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
  @Column({ type: 'varchar', length: 20 })
  email: string;
  @Column({ type: 'varchar', length: 20 })
  phone_number: string;
  @Column({
    type: 'enum',
    enum: MemberAuthority,
    default: MemberAuthority.MEMBER,
  })
  authority: MemberAuthority;
  @Column({ type: 'datetime' })
  date_birth: Date;
  @Column({ type: 'enum', enum: RecordState, default: RecordState.NONE })
  isDeleted: RecordState;
  @CreateDateColumn()
  date_register: Date;

  async comparePassword(cryptogram: string): Promise<boolean> {
    return cryptogram === this.password;
  }
}
