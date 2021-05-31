import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
//Request

//Response
@Exclude()
export class BoardViewResDto {
  @Expose()
  @IsNumber()
  readonly identifier: number;

  @Expose()
  @IsString()
  readonly title: string;

  @Expose()
  @IsString()
  readonly nickname: string;

  @Expose()
  @IsString()
  readonly profile_photo_path: string;

  @Expose()
  @IsString()
  readonly summary: string;

  @Expose()
  @IsNumber()
  readonly commentNum: number;
}
