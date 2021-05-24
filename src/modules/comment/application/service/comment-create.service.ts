import { Inject, Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { CommentPort, COMMENT_PORT } from '../../domain/port/comment.port';
import { CommentCreateReqDto } from '../dto/comment-create.dto';

@Injectable()
export class CommentCreateService {
  constructor(
    @Inject(COMMENT_PORT) private readonly commentPort: CommentPort,
  ) {}

  async create(
    memberIdentifier: number,
    commentCreateReqDto: CommentCreateReqDto,
  ): Promise<number | undefined> {
    try {
      const commentIdentifier: number = await this.commentPort.createComment(
        memberIdentifier,
        commentCreateReqDto,
      );
      return commentIdentifier;
    } catch (error) {
      throw new UnexpectedErrorException();
    }
  }
}
