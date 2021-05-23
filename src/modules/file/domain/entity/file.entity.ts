import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from 'src/modules/question/domain/entity/question.entity';
import { Board } from 'src/modules/board/domain/entity/board.entity';
import { FilesType } from '../type/files.type';
import { FileState } from '../type/file-state.type';

@Entity()
export class File {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  identifier: number;

  /*relation*/
  @ManyToOne(() => Board, (board) => board.identifier, {
    lazy: true,
  })
  board: Board;
  @ManyToOne(() => Question, (question) => question.identifier, {
    lazy: true,
  })
  question: Question;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name_original: string;
  @Column({ type: 'varchar', length: 100, default: null })
  name_edit: string;
  @Column({ type: 'int', nullable: false })
  size: number;
  @Column({ type: 'enum', enum: FilesType, nullable: false })
  extension: FilesType;
  @CreateDateColumn({ type: 'datetime', nullable: false })
  created_date: Date;
  @UpdateDateColumn({ type: 'datetime', default: null })
  updated_date: Date;
  @Column({ type: 'varchar', length: 100, nullable: false })
  path: string;
  @Column({ type: 'enum', enum: FileState, default: FileState.EXIST })
  isDeleted: FileState;
}
