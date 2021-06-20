import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

//Request
export class BoardSearchReqDto {
  @ApiProperty()
  @IsString()
  readonly keyword: string;
}

//Response
