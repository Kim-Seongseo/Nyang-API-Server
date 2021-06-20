import { BoardCreateReqDto } from '../../application/dto/board-create.dto';
import { BoardDetailViewResDto } from '../../application/dto/board-detail.dto';
import { BoardHistoryResDto } from '../../application/dto/board-history.dto';
import { BoardUpdateReqDto } from '../../application/dto/board-update.dto';
import { BoardViewResDto } from '../../application/dto/board-view.dto';
import { BoardType } from '../type/board.type';

export const BOARD_PORT = 'BOARD_PORT';

export interface BoardPort {
  createBoard(
    memberIdentifier: number,
    boardCreateReqDto: BoardCreateReqDto,
    category: BoardType,
  ): Promise<number | undefined>;
  updateBoard(
    boardIdentifier: number,
    boardUpdateReqDto: BoardUpdateReqDto,
  ): Promise<number | undefined>;
  deleteBoardbyIdentifier(boardIdentifier: number): Promise<number | undefined>;

  findIssuerByIdentifier(boardIdentifier: number): Promise<number | undefined>;

  findBoardDetailByIdentifierAndMember(
    memberIdentifier: number,
    memberIsAdmin: boolean,
    identifier: number,
  ): Promise<BoardDetailViewResDto | undefined>;

  findPaginatedBoardByKeyword(
    skippedItems: number,
    perPage: number,
    keyword: string,
    category: BoardType,
  ): Promise<BoardViewResDto[] | undefined>;

  findPaginatedBoardByMemberIdentifier(
    memberIdentifier: number,
    skippedItems: number,
    perPage: number,
    category: BoardType,
  ): Promise<BoardHistoryResDto[] | undefined>;

  countBoard(category: BoardType): Promise<number | undefined>;

  countBoardByMemberIdentifier(
    memberIdentifier,
    category,
  ): Promise<number | undefined>;
}
