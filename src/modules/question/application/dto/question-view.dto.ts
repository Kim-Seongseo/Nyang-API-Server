import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { QuestionState } from '../../domain/entity/question-state.enum';

//Request

//Response
@Exclude()
export class QuestionViewResDto {
  @Expose()
  @IsString()
  readonly title: string;

  @Expose()
  @IsString()
  readonly content: string;

  @Expose()
  @IsString()
  readonly species: string;

  @Expose()
  @IsString()
  readonly nickname: string;

  @Expose()
  @IsNumber()
  readonly state: QuestionState;

  @Expose()
  @IsNumber()
  readonly answerNum: number;
}
