import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

//request
export class CommentCreateReqDto {
  @ApiProperty()
  @IsNumber()
  readonly postIdentifier: number;

  @ApiProperty()
  @IsString()
  readonly content: string;
}
