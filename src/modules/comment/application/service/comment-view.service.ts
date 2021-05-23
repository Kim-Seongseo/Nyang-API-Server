import { Inject, Injectable } from "@nestjs/common";
import { CommentPort, COMMENT_PORT } from "../../domain/port/comment.port";
import { CommentViewResDto } from "../dto/comment-view.dto";
import { NotExistException } from "../exception/not-exist.exception";

@Injectable()
export class CommentViewService {
  constructor(@Inject(COMMENT_PORT) private readonly commentPort: CommentPort) {}

  async view(postIdentifier: number): Promise<CommentViewResDto[] | undefined> {
    const comments: CommentViewResDto[] = await this.commentPort.findCommentByPostIdentifier(postIdentifier);
    
    if (!comments) {
      throw new NotExistException();
    }
    
    return comments;
  }
}
