import { Inject, Injectable } from '@nestjs/common';
import { CommentPort, COMMENT_PORT } from '../../domain/port/comment.port';

@Injectable()
export class CommentUtilService {
  constructor(
    @Inject(COMMENT_PORT) private readonly commentPort: CommentPort,
  ) {}

  async skip(page: number, perPage: number): Promise<number | undefined> {
    return (page - 1) * perPage;
  }

  async totalDataPerMember(
    memberIdentifier: number,
  ): Promise<number | undefined> {
    return await this.commentPort.countBoardByMemberIdentifier(
      memberIdentifier,
    );
  }

  async totalPage(
    totalData: number,
    perPage: number,
  ): Promise<number | undefined> {
    return Math.ceil(totalData / perPage);
  }
}
