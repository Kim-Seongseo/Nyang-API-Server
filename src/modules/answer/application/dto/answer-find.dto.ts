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
  select_state: AnswerState;

  @Expose()
  @IsDate()
  create_date: Date;

  @Expose()
  @IsNumber()
  memberIdentifier: number;

  @Expose()
  @IsString()
  nickname: string;

  @Expose()
  @IsNumber()
  adopted_number: number;

  @Expose()
  @IsString()
  profile_photo_path: string;

  @Expose()
  @IsBoolean()
  isEditable: boolean;
}
