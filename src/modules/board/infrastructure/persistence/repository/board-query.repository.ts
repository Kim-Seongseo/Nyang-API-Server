import { classToPlain, plainToClass } from 'class-transformer';
import { BoardDetailViewResDto } from 'src/modules/board/application/dto/board-detail.dto';
import { BoardViewResDto } from 'src/modules/board/application/dto/board-view.dto';
import { Board } from 'src/modules/board/domain/entity/board.entity';
import { BoardIssuer } from 'src/modules/board/domain/type/board-issuer.type';
import { BoardType } from 'src/modules/board/domain/type/board.type';
import { RecordState } from 'src/modules/post/domain/entity/record-state.enum';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Board)
export class BoardQueryRepository extends Repository<Board> {
  async findIssuerByIdentifier(
    boardIdentifer: number,
  ): Promise<number | undefined> {
    const issuer: number = await this.createQueryBuilder('b')
      .select('m.identifier', 'identifier')
      .innerJoin('member', 'm', 'b.member_identifier = m.identifier')
      .getRawOne();
    return issuer;
  }

  async findBoardDetailByIdentifier(
    memberIdentifier,
    memberIsAdmin,
    identifier,
  ): Promise<BoardDetailViewResDto | undefined> {
    try {
      const data = await this.createQueryBuilder('b')
        .select('b.title', 'title')
        .addSelect('b.content', 'content')
        .addSelect('m.nickname', 'nickname')
        .addSelect('b.category', 'category')
        .addSelect('b.commonCreate_date', 'createDate')
        .addSelect('m.identifier', 'memberIdentifier')
        .addSelect('m.member_photo')
        .where('b.identifier = :identifier', { identifier })
        .addSelect('f.path', 'profile_photo_path')
        .innerJoin('b.member_identifier', 'm', 'm.isDeleted = :isDeleted', {
          isDeleted: RecordState.NONE,
        })
        .leftJoin('file', 'f', 'm.member_photo = f.identifier')
        .getRawOne();

      const boardDetailViewResDto: BoardDetailViewResDto = plainToClass(
        BoardDetailViewResDto,
        classToPlain(data),
      );
      if (
        data &&
        (data.memberIdentifier === memberIdentifier || memberIsAdmin)
      ) {
        boardDetailViewResDto.isIssuer = BoardIssuer.ISSUER;
      }
      return boardDetailViewResDto;
    } catch (error) {
      console.log(error);
    }
  }
  async findPaginatedQuestionByKeyword(
    skippedItems: number,
    perPage: number,
    keyword: string,
    category: BoardType,
  ): Promise<BoardViewResDto[] | undefined> {
    const query = this.createQueryBuilder('b')
      .select('b.identifier', 'identifier')
      .addSelect('b.title', 'title')
      .addSelect('b.content', 'content')
      .addSelect('m.nickname', 'nickname')
      .addSelect('count(c.identifier)', 'commentNum')
      .addSelect('b.create_date', 'create_date')
      .innerJoin('member', 'm', 'b.memberIdentifierIdentifier = m.identifier')
      .leftJoin('comment', 'c', 'c.boardIdentifierIdentifier = b.identifier')
      .where('b.commonIs_deleted = :none', { none: 'none' })
      .andWhere('b.category = :category', { category });
    if (keyword) {
      query.andWhere('b.title like :keyword', {
        keyword: `%${keyword}%`,
      });
    }
    const datas = await query
      .groupBy('b.identifier')
      .orderBy('create_date', 'DESC')
      .offset(skippedItems)
      .limit(perPage)
      .getRawMany();

    return datas.map((data) => {
      return plainToClass(BoardViewResDto, classToPlain(data));
    });
  }
}
