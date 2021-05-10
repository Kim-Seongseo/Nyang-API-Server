import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

//Request
export class QuestionUpdateReqDto {
  @ApiProperty()
  @IsString()
  readonly genus: string;

  @ApiProperty()
  @IsString()
  readonly species: string;

  @ApiProperty()
  @IsNumber()
  readonly age: number;

  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly content: string;
}

// Response state
