import { Column, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Common } from 'src/modules/common/domain/entity/common.entity';

export abstract class Post {
  @PrimaryColumn({ type: 'bigint' })
  identifier: number;

  /*properties*/
  @Column({ type: 'varchar', length: 100 })
  title: string;
  @Column({ type: 'text' })
  content: string;
  @Column((type) => Common)
  common: Common;
}
