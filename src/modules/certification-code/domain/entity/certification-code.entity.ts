import { RequestTimeoutException } from '@nestjs/common';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CertificationType } from './certification-type.enum';

@Entity({ orderBy: { create_date: 'DESC' } })
export class CertificationCode {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  identifier: number;

  /*relations*/

  /*properties*/
  @Column({
    type: 'enum',
    enum: CertificationType,
    default: CertificationType.EMAIL,
  })
  type: CertificationType;
  @Column({ type: 'varchar', length: 100 })
  contact_info: string;
  @Column({ type: 'varchar', length: 20 })
  certification_code: string;
  @CreateDateColumn()
  create_date: Date;

  /*business method*/
  async checkValid(currentTime: Date): Promise<number | undefined> {
    if (
      currentTime.getTime() - this.create_date.getTime() >
      Number(process.env.CERTIFICATION_LIMIT_TIME)
    )
      throw new RequestTimeoutException();
    return this.identifier;
  }
}
