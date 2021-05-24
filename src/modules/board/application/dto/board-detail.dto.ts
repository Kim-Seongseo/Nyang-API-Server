import { Exclude, Expose } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BoardIssuer } from '../../domain/type/board-issuer.type';

//Request

//Response
@Exclude()
export class BoardDetailViewResDto {
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
  readonly nickname: string;

  @Expose()
  @IsString()
  readonly profile_photo_path: string;

  @Expose()
  @IsDate()
  readonly createDate: Date;

  @Expose()
  @IsEnum(BoardIssuer)
  isIssuer: BoardIssuer;
}
