import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

//Request

//Response
@Exclude()
export class QuestionDetailViewResDto {
  @Expose()
  @IsString()
  readonly title: string;

  @Expose()
  @IsString()
  readonly content: string;

  @Expose()
  @IsString()
  readonly genus: string;

  @Expose()
  @IsString()
  readonly species: string;

  @Expose()
  @IsString()
  readonly age: string;

  @Expose()
  @IsString()
  readonly nickname: string;

  @Expose()
  @IsDate()
  readonly createDate: Date;
}
