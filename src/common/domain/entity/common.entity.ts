import { CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

export class Common {
  /*properties*/
  @Column({ type: 'varchar' })
  is_deleted: string;

  /*timestamps*/
  @CreateDateColumn()
  create_date: Date;
  @UpdateDateColumn()
  update_date: Date;
}
