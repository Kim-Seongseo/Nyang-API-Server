import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { QuestionState } from '../../domain/entity/question-state.enum';

@Exclude()
export class QuestionHistoryResDto {
  @Expose()
  @IsNumber()
  identifier: number;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsDate()
  created_date: Date;

  @Expose()
  @IsNumber()
  answer_number: number;

  @Expose()
  @IsEnum({ type: 'enum', enum: QuestionState })
  state: QuestionState;
}
