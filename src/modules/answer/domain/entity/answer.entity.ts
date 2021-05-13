import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Common } from 'src/modules/common/domain/entity/common.entity';
import { Member } from 'src/modules/member/domain/entity/member.entity';
import { Question } from 'src/modules/question/domain/entity/question.entity';
import { AnswerState } from '../type/answer-state.type';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  identifier: number;

  /* relations */
  @ManyToOne(() => Member, { lazy: true, cascade: false })
  member_identifier: Member;
  @ManyToOne(() => Question, { lazy: true, cascade: false })
  question_identifier: Question;

  /*properties*/
  @Column({ type: 'text' })
  content: string;
  @Column({ type: 'enum', enum: AnswerState, default: AnswerState.NONE })
  select_state: AnswerState;
  @Column((type) => Common)
  common: Common;
}
