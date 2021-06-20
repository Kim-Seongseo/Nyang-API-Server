import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

//request
export class AnswerUpdateReqDto {
  @ApiProperty()
  @IsString()
  content: string;
}
