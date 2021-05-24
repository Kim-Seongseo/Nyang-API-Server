import { Exclude, Expose } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BoardIssuer } from '../../domain/type/board-issuer.type';
import { BoardType } from '../../domain/type/board.type';

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
  @IsEnum({ type: 'enum', enum: BoardType })
  readonly category: BoardType;

  @Expose()
  @IsEnum(BoardIssuer)
  isIssuer: BoardIssuer;
}
