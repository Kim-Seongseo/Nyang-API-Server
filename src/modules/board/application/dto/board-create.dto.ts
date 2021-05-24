import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

// req
export class BoardCreateReqDto {
  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly content: string;
}

// res
