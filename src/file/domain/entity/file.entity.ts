import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Question } from '../../../question/domain/entity/question.entity';
import { Board } from '../../../board/domain/entity/board.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  identifier: number;

  /*relations*/
  @ManyToOne(() => Question, (post) => post.files)
  question_identifier: Question;
  @ManyToOne(() => Board, (board) => board.files)
  board_identifier: Board;

  /*properties*/
  @Column({ type: 'text' })
  file_path: string;

  /*timestamps*/
  @CreateDateColumn()
  date_register: Date;
}
