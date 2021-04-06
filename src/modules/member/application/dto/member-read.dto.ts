import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

// Request: url

// Response
@Exclude()
export class MemberReadResDto {
  @Expose()
  @IsString()
  readonly account: string;

  @Expose()
  @IsString()
  readonly name: string;

  @Expose()
  @IsString()
  readonly nickname: string;

  @Expose()
  @IsString()
  readonly email: string;

  @Expose()
  @IsString()
  readonly phone_number: string;

  @Expose()
  @IsString()
  readonly date_birth: Date;
}
