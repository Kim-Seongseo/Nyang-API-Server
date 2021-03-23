import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Post } from '../../../common/domain/entity/post.entity';
import { Member } from '../../../member/domain/entity/member.entity';
import { File } from '../../../file/domain/entity/file.entity';
@Entity()
export class Question extends Post {
  @Column({ type: 'varchar', length: 40 })
  genus: string;

  @Column({ type: 'varchar', length: 40 })
  species: string;

  @Column({ type: 'int', width: 4 })
  age: number;

  @Column({ type: 'varchar', length: 20 })
  state: string;

  @ManyToOne(() => Member, { lazy: true, cascade: false })
  member_identifier: Member;

  @OneToMany(() => File, (file) => file.board_identifier)
  files: File[];
}
