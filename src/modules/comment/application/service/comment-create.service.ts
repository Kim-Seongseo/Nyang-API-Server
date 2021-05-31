import { Inject, Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { CommentPort, COMMENT_PORT } from '../../domain/port/comment.port';
import { CommentCreateReqDto } from '../dto/comment-create.dto';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class CommentCreateService {
  constructor(
    @Inject(COMMENT_PORT) private readonly commentPort: CommentPort,
  ) {}

  @Transactional()
  async create(
    memberIdentifier: number,
    commentCreateReqDto: CommentCreateReqDto,
  ): Promise<number | undefined> {
    const commentIdentifier: number = await this.commentPort.createComment(
      memberIdentifier,
      commentCreateReqDto,
    );
    if (!commentIdentifier) {
      throw new UnexpectedErrorException();
    }

    return commentIdentifier;
  }
}
