import { Injectable } from '@nestjs/common';
import { CommentCreateReqDto } from '../../application/dto/comment-create.dto';
import { CommentViewResDto } from '../../application/dto/comment-view.dto';
import { CommentHistoryResDto } from '../../application/dto/commnet-history.dto';
import { Comment } from '../../domain/entity/comment.entity';
import { CommentPort } from '../../domain/port/comment.port';
import { CommentQueryRepository } from './repository/comment-query.repository';
import { CommentRepository } from './repository/comment.repository';

@Injectable()
export class CommentAdapter implements CommentPort {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly commentQueryRepository: CommentQueryRepository,
  ) {}

  async createComment(
    memberIdentifier: number,
    commentCreateReqDto: CommentCreateReqDto,
  ): Promise<number | undefined> {
    const comment = await this.commentRepository.create({
      member: { identifier: memberIdentifier },
      board_identifier: { identifier: commentCreateReqDto.postIdentifier },
      content: commentCreateReqDto.content,
    });

    await this.commentRepository.save(comment);
    return comment.identifier;
  }

  async deleteCommentByIdentifier(
    identifier: number,
  ): Promise<number | undefined> {
    await this.commentRepository.delete({ identifier });
    return identifier;
  }

  async findCommentByIdentifier(
    identifier: number,
  ): Promise<Comment | undefined> {
    const comment = await this.commentRepository.findOne({ identifier });
    return comment;
  }

  async findCommentByPostIdentifier(
    memberIdentifier: number,
    postIdentifier: number,
  ): Promise<CommentViewResDto[] | undefined> {
    const comments = await this.commentQueryRepository.findCommentByPostIdentifier(
      memberIdentifier,
      postIdentifier,
    );
    return comments;
  }

  async findPaginatedCommentByMemberIdentifier(
    memberIdentifier: number,
    skippedItems: number,
    perPage: number,
  ): Promise<CommentHistoryResDto[] | undefined> {
    const comments: CommentHistoryResDto[] = await this.commentQueryRepository.findPaginatedCommentByMemberIdentifier(
      memberIdentifier,
      skippedItems,
      perPage,
    );
    return comments;
  }

  async saveComment(comment: Comment): Promise<number | undefined> {
    await this.commentRepository.save(comment);
    return comment.identifier;
  }

  async countBoardByMemberIdentifier(
    memberIdentifier: number,
  ): Promise<number | undefined> {
    const count: number = await this.commentRepository.count({
      member: { identifier: memberIdentifier },
    });
    return count;
  }
}
