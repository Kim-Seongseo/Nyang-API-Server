import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Common } from '../../../common/domain/entity/common.entity';
import { Member } from '../../../member/domain/entity/member.entity';
import { Question } from '../../../question/domain/entity/question.entity';

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
  @Column({ type: 'varchar', length: 20 })
  select_state: string;
  @Column((type) => Common)
  common: Common;
}
