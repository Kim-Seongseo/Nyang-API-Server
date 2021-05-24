import { Inject, Injectable } from '@nestjs/common';
import { Member } from 'src/modules/member/domain/entity/member.entity';
import { Comment } from '../../domain/entity/comment.entity';
import { CommentPort, COMMENT_PORT } from '../../domain/port/comment.port';
import { NotAIssuerException } from '../exception/not-a-issuer.exception';

@Injectable()
export class CommentDeleteService {
  constructor(
    @Inject(COMMENT_PORT) private readonly commentPort: CommentPort,
  ) {}

  async delete(
    identifier: number,
    memberIdentifier: number,
  ): Promise<number | undefined> {
    const comment: Comment = await this.commentPort.findCommentByIdentifier(
      identifier,
    );

    const member: Member = await comment.member;
    if (member.identifier !== memberIdentifier) {
      throw new NotAIssuerException();
    }

    const commentIdentifier: number = await this.commentPort.deleteCommentByIdentifier(
      identifier,
    );

    return commentIdentifier;
  }
}
