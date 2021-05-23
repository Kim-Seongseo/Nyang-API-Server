import {
  AbstractRepository,
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Common } from 'src/modules/common/domain/entity/common.entity';
import { File } from 'src/modules/file/domain/entity/file.entity';

// @Entity()

export abstract class Post {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  identifier: number;

  /*properties*/
  @Column({ type: 'varchar', length: 100 })
  title: string;
  @Column({ type: 'text' })
  content: string;
  @Column((type) => Common)
  common: Common;
}
