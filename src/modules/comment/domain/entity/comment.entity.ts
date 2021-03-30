import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Common } from 'src/modules/common/domain/entity/common.entity';
import { Member } from 'src/modules/member/domain/entity/member.entity';
import { Board } from 'src/modules/board/domain/entity/board.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  identifier: number;

  /*relations*/
  @ManyToOne(() => Member, { lazy: true, cascade: false })
  member: Member;
  @ManyToOne(() => Board, { lazy: true, cascade: false })
  board_identifier: Board;

  /*properties*/
  @Column({ type: 'text' })
  content: string;
  @Column((type) => Common)
  common: Common;
}
