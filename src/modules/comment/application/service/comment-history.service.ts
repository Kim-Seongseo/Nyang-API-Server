import { Inject, Injectable } from '@nestjs/common';
import { NotExistException } from 'src/modules/answer/application/exception/not-exist.exception';
import { CommentPort, COMMENT_PORT } from '../../domain/port/comment.port';
import { CommentHistoryResDto } from '../dto/commnet-history.dto';

@Injectable()
export class CommentHistoryService {
  constructor(
    @Inject(COMMENT_PORT) private readonly commentPort: CommentPort,
  ) {}

  async history(
    memberIdentifier: number,
    perPage: number,
    skippedItems: number,
  ): Promise<CommentHistoryResDto[] | undefined> {
    const comments: CommentHistoryResDto[] = await this.commentPort.findPaginatedCommentByMemberIdentifier(
      memberIdentifier,
      skippedItems,
      perPage,
    );
    if (!comments) {
      throw new NotExistException();
    }

    return comments;
  }
}
