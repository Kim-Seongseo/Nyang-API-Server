import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { AnswerState } from '../../domain/type/answer-state.type';

@Exclude()
export class AnswerHistoryResDto {
  @Expose()
  @IsNumber()
  identifier: number;

  @Expose()
  @IsNumber()
  question_identifier: number;

  @Expose()
  @IsString()
  question_title: string;

  @Expose()
  @IsString()
  content: string;

  @Expose()
  @IsEnum({ type: 'enum', enum: AnswerState })
  state: AnswerState;

  @Expose()
  @IsDate()
  created_date: Date;
}
