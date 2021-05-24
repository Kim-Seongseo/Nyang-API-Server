import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

//response
@Exclude()
export class CommentViewResDto {
  @Expose()
  @IsNumber()
  identifier: number;

  @Expose()
  @IsString()
  content: string;

  @Expose()
  @IsString()
  nickname: string;

  @Expose()
  @IsDate()
  create_date: Date;

  @Expose()
  @IsBoolean()
  isEditable: boolean;

  // 프로필 이미지
}
