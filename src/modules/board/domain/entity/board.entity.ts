import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Post } from 'src/modules/post/domain/entity/post.entity';
import { Member } from 'src/modules/member/domain/entity/member.entity';
import { File } from 'src/modules/file/domain/entity/file.entity';
import { BoardType } from '../type/board.type';
@Entity()
export class Board extends Post {
  /*relations*/
  @ManyToOne(() => Member, { lazy: true, cascade: false })
  member_identifier: Member;
  @OneToMany(() => File, (file) => file.board, {
    lazy: true,
    cascade: true,
  })
  files: File[];

  /*properties*/
  @Column({ type: 'enum', enum: BoardType, nullable: false })
  category: BoardType;
}
