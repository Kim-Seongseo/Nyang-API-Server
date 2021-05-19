import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Question } from 'src/modules/question/domain/entity/question.entity';
import { Board } from 'src/modules/board/domain/entity/board.entity';
import { Post } from 'src/modules/post/domain/entity/post.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  identifier: number;

  /*relations*/
  @ManyToOne(() => Post, (post) => post.files)
  post_identifier: Post;

  /*properties*/
  @Column({ type: 'bigint' })
  server_identifier: string;

  /*timestamps*/
  @CreateDateColumn()
  date_register: Date;
}
