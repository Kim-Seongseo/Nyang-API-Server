import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

//response
@Exclude()
export class CommentViewResDto {
  @Expose()
  @IsNumber()
  readonly identifier: number;

  @Expose()
  @IsString()
  readonly content: string;

  @Expose()
  @IsString()
  readonly nickname: string;

  @Expose()
  @IsDate()
  readonly create_date: Date;

  @Expose()
  @IsBoolean()
  readonly isEditable: boolean;

  @Expose()
  @IsString()
  readonly profile_photo_path: string;
}
