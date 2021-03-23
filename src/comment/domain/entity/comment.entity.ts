import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Common } from '../../../common/domain/entity/common.entity';
import { Member } from '../../../member/domain/entity/member.entity';
import { Board } from '../../../board/domain/entity/board.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  identifier: number;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => Member, { lazy: true, cascade: false })
  member: Member;

  @ManyToOne(() => Board, { lazy: true, cascade: false })
  board_identifier: Board;

  @Column((type) => Common)
  common: Common;
}
