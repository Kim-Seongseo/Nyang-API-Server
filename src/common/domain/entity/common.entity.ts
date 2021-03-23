import { CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

export class Common {
  @CreateDateColumn()
  create_date: Date;

  @UpdateDateColumn()
  update_date: Date;

  @Column({ type: 'varchar' })
  is_deleted: string;
}
