import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { QuestionState } from '../../domain/entity/question-state.enum';

//Request

//Response
@Exclude()
export class QuestionViewResDto {
  @Expose()
  @IsNumber()
  readonly identifier: number;

  @Expose()
  @IsString()
  readonly title: string;

  @Expose()
  @IsString()
  readonly summary: string;

  @Expose()
  @IsString()
  readonly genus: string;

  @Expose()
  @IsString()
  readonly nickname: string;

  @Expose()
  @IsString()
  readonly profile_photo_path: string;

  @Expose()
  @IsNumber()
  readonly state: QuestionState;

  @Expose()
  @IsNumber()
  readonly answerNum: number;
}
