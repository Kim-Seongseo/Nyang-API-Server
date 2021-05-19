import { Inject, Injectable } from '@nestjs/common';
import { QuestionPort, QUESTION_PORT } from '../../domain/port/question.port';
import * as getImgSrc from 'get-img-src';
import * as HTMLParser from 'node-html-parser';

@Injectable()
export class QuestionExtractFileService {
  constructor(
    @Inject(QUESTION_PORT) private readonly questionPort: QuestionPort,
  ) {}

  async extractFilesFromContent(content: string, postIdentifier: number) {
    const srcs: string[] = this.getSrc(content);
    return;
  }

  getSrc(content: string): string[] | undefined {
    const files: string[] = HTMLParser.parse(content)
      .querySelectorAll('img')
      .map((img) => {
        return img.attributes.src;
      });
    return files;
  }
}
