import { Inject, Injectable } from '@nestjs/common';
import { Member } from 'src/modules/member/domain/entity/member.entity';
import { Comment } from '../../domain/entity/comment.entity';
import { CommentPort, COMMENT_PORT } from '../../domain/port/comment.port';
import { CommentUpdateReqDto } from '../dto/comment-update.dto';
import { NotAIssuerException } from '../exception/not-a-issuer.exception';
import { NotExistException } from '../exception/not-exist.exception';

@Injectable()
export class CommentUpdateService {
  constructor(
    @Inject(COMMENT_PORT) private readonly commentPort: CommentPort,
  ) {}

  async update(
    identifer: number,
    memberIdentifier: number,
    commentUpdateReqDto: CommentUpdateReqDto,
  ): Promise<number | undefined> {
    const comment: Comment = await this.commentPort.findCommentByIdentifier(
      identifer,
    );
    if (!comment) {
      throw new NotExistException();
    }

    const member: Member = await comment.member;
    if (member.identifier !== memberIdentifier) {
      throw new NotAIssuerException();
    }

    comment.content = commentUpdateReqDto.content;
    const commentIdentifier: number = await this.commentPort.saveComment(
      comment,
    );

    return commentIdentifier;
  }
}
