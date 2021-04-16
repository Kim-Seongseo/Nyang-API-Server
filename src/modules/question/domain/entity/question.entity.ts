import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Post } from 'src/modules/post/domain/entity/post.entity';
import { Member } from 'src/modules/member/domain/entity/member.entity';
import { File } from 'src/modules/file/domain/entity/file.entity';
@Entity()
export class Question extends Post {
  /*relations*/
  @ManyToOne(() => Member, { lazy: true, cascade: false })
  member_identifier: Member;
  @OneToMany(() => File, (file) => file.board_identifier, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  files: File[];

  /*properties*/
  @Column({ type: 'varchar', length: 40 })
  genus: string;
  @Column({ type: 'varchar', length: 40 })
  species: string;
  @Column({ type: 'int', width: 4 })
  age: number;
  @Column({ type: 'varchar', length: 20 })
  state: string;
}
