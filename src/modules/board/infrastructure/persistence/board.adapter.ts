import { Injectable } from '@nestjs/common';
import { BoardCreateReqDto } from '../../application/dto/board-create.dto';
import { BoardDetailViewResDto } from '../../application/dto/board-detail.dto';
import { BoardUpdateReqDto } from '../../application/dto/board-update.dto';
import { BoardViewResDto } from '../../application/dto/board-view.dto';
import { Board } from '../../domain/entity/board.entity';
import { BoardPort } from '../../domain/port/board.port';
import { BoardType } from '../../domain/type/board.type';
import { BoardQueryRepository } from './repository/board-query.repository';
import { BoardRepository } from './repository/board.repository';

@Injectable()
export class BoardAdapter implements BoardPort {
  constructor(
    private readonly boardRepository: BoardRepository,
    private readonly boardQueryRepostiory: BoardQueryRepository,
  ) {}

  async createBoard(
    memberIdentifier: number,
    boardCreateReqDto: BoardCreateReqDto,
    category: BoardType,
  ): Promise<number | undefined> {
    const board: Board = await this.boardRepository.create({
      member_identifier: { identifier: memberIdentifier },
      ...boardCreateReqDto,
      category,
    });

    await this.boardRepository.save(board);
    return board.identifier;
  }

  async updateBoard(
    boardIdentifier: number,
    boardUpdateReqDto: BoardUpdateReqDto,
  ): Promise<number | undefined> {
    await this.boardRepository.update(
      { identifier: boardIdentifier },
      { ...boardUpdateReqDto },
    );
    return boardIdentifier;
  }

  async deleteBoardbyIdentifier(
    boardIdentifier: number,
  ): Promise<number | undefined> {
    await this.boardRepository.delete({ identifier: boardIdentifier });
    return boardIdentifier;
  }

  async findIssuerByIdentifier(
    boardIdentifier: number,
  ): Promise<number | undefined> {
    const issuer: number = await this.boardQueryRepostiory.findIssuerByIdentifier(
      boardIdentifier,
    );
    return issuer;
  }

  async findBoardDetailByIdentifierAndMember(
    memberIdentifier: number,
    memberIsAdmin: boolean,
    boardIdentifier: number,
  ): Promise<BoardDetailViewResDto | undefined> {
    const board: BoardDetailViewResDto = await this.boardQueryRepostiory.findBoardDetailByIdentifier(
      memberIdentifier,
      memberIsAdmin,
      boardIdentifier,
    );
    return board;
  }

  async findPaginatedBoardByKeyword(
    skippedItems: number,
    perPage: number,
    keyword: string,
    category: BoardType,
  ): Promise<BoardViewResDto[] | undefined> {
    const boards: BoardViewResDto[] = await this.boardQueryRepostiory.findPaginatedQuestionByKeyword(
      skippedItems,
      perPage,
      keyword,
      category,
    );
    return boards;
  }

  async findPaginatedBoard(
    skippedItems: number,
    perPage: number,
    category: BoardType,
  ): Promise<BoardViewResDto[] | undefined> {
    const boards: BoardViewResDto[] = await this.boardQueryRepostiory.findPaginatedQuestionByKeyword(
      skippedItems,
      perPage,
      null,
      category,
    );
    return boards;
  }

  async countBoard(category: BoardType): Promise<number | undefined> {
    const count: number = await this.boardRepository.count({ category });
    return count;
  }
}
