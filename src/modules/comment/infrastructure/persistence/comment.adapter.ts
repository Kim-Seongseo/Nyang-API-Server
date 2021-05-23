import { Injectable } from "@nestjs/common";
import { CommentCreateReqDto } from "../../application/dto/comment-create.dto";
import { CommentViewResDto } from "../../application/dto/comment-view.dto";
import { Comment } from "../../domain/entity/comment.entity";
import { CommentPort } from "../../domain/port/comment.port";
import { CommentQueryRepository } from "./repository/comment-query.repository";

@Injectable()
export class CommentAdapter implements CommentPort {
  constructor(
    private readonly commentQueryRepository: CommentQueryRepository,
  ) {}

  async createComment(
    memberIdentifier: number,
    commentCreateReqDto: CommentCreateReqDto,
  ): Promise<number | undefined> {
    const comment = await this.commentQueryRepository.create({
      member: { identifier: memberIdentifier },
      board_identifier: { identifier: commentCreateReqDto.postIdentifier },
      content: commentCreateReqDto.content,
    })

    await this.commentQueryRepository.save(comment);
    return comment.identifier;
  }

  async deleteCommentByIdentifier(identifier: number): Promise<number | undefined> {
    await this.commentQueryRepository.delete({ identifier });
    return identifier;
  }

  async findCommentByIdentifier(identifier: number): Promise<Comment | undefined> {
    const comment = await this.commentQueryRepository.findOne({ identifier });
    return comment;
  }

  async findCommentByPostIdentifier(postIdentifier: number): Promise<CommentViewResDto[] | undefined> {
    const comments = await this.commentQueryRepository.findCommentByPostIdentifier(postIdentifier);
    return comments;
  }

  async saveComment(comment: Comment): Promise<number | undefined> {
    await this.commentQueryRepository.save(comment);
    return comment.identifier;
  }
}
