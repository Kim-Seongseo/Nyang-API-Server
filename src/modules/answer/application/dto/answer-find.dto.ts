import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { AnswerState } from '../../domain/type/answer-state.type';
//request

//response
@Exclude()
export class AnswerFindResDto {
  @Expose()
  @IsNumber()
  identifier: number;

  @Expose()
  @IsString()
  content: string;

  @Expose()
  @IsEnum({ type: 'enum', enum: AnswerState })
  selects_state: AnswerState;

  @Expose()
  @IsDate()
  create_date: Date;

  @Expose()
  @IsNumber()
  memberIdentifier: number;

  @Expose()
  @IsString()
  nickname: string;

  //   @Expose()
  //   @사진()

  @Expose()
  @IsBoolean()
  isEditable: boolean;
}
