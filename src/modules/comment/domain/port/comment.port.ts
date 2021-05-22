import { CommentCreateReqDto } from "../../application/dto/comment-create.dto";
import { CommentViewResDto } from "../../application/dto/comment-view.dto";
import { Comment } from "../entity/comment.entity";

export const COMMENT_PORT = 'COMMENT_PORT';

export interface CommentPort {
  createComment(
    memberIdentifier: number,
    commentCreateReqDto: CommentCreateReqDto,
  ): Promise<number | undefined>;
  deleteCommentByIdentifier(identifer: number): Promise<number | undefined>;
  findCommentByIdentifier(identifier: number): Promise<Comment | undefined>;
  findCommentByPostIdentifier(postIdentifer: number): Promise<CommentViewResDto[] | undefined>;
  saveComment(comment: Comment): Promise<number | undefined>;
}
