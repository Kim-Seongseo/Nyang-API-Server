import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

//request
export class CommentUpdateReqDto {
  @ApiProperty()
  @IsString()
  readonly content: string;
}
