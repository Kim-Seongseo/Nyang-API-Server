import { CommentCreateReqDto } from '../../application/dto/comment-create.dto';
import { CommentViewResDto } from '../../application/dto/comment-view.dto';
import { CommentHistoryResDto } from '../../application/dto/commnet-history.dto';
import { Comment } from '../entity/comment.entity';

export const COMMENT_PORT = 'COMMENT_PORT';

export interface CommentPort {
  createComment(
    memberIdentifier: number,
    commentCreateReqDto: CommentCreateReqDto,
  ): Promise<number | undefined>;
  deleteCommentByIdentifier(identifer: number): Promise<number | undefined>;
  findCommentByIdentifier(identifier: number): Promise<Comment | undefined>;
  findCommentByPostIdentifier(
    memberIdentifier: number,
    postIdentifer: number,
  ): Promise<CommentViewResDto[] | undefined>;
  findPaginatedCommentByMemberIdentifier(
    memberIdentifier: number,
    skippedItems: number,
    perPage: number,
  ): Promise<CommentHistoryResDto[] | undefined>;
  saveComment(comment: Comment): Promise<number | undefined>;
  countBoardByMemberIdentifier(
    memberIdentifier: number,
  ): Promise<number | undefined>;
}
