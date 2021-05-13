import { Exclude, Expose } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { QuestionIssuer } from '../../domain/type/question-issuer.type';

//Request

//Response
@Exclude()
export class QuestionDetailViewResDto {
  @Expose()
  @IsNumber()
  readonly identifier: number;

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

  @Expose()
  @IsEnum(QuestionIssuer)
  isIssuer: QuestionIssuer;
}
