import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

// Request: url

// Response
@Exclude()
export class MemberReadResDto {
  @ApiProperty()
  @Expose()
  @IsString()
  readonly account: string;

  @ApiProperty()
  @Expose()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @Expose()
  @IsString()
  readonly nickname: string;

  @ApiProperty()
  @Expose()
  @IsString()
  readonly email: string;

  @ApiProperty()
  @Expose()
  @IsString()
  readonly phone_number: string;

  @ApiProperty()
  @Expose()
  @IsString()
  readonly date_birth: Date;
}
