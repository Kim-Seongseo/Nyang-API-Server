import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

@Exclude()
export class CommentHistoryResDto {
  @Expose()
  @IsNumber()
  identifier: number;

  @Expose()
  @IsNumber()
  board_identifier: number;

  @Expose()
  @IsString()
  board_title: string;

  @Expose()
  @IsString()
  content: string;

  @Expose()
  @IsDate()
  created_date: Date;
}
