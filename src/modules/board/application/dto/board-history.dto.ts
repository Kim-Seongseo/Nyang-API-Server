import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

@Exclude()
export class BoardHistoryResDto {
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
  comment_number: number;
}
