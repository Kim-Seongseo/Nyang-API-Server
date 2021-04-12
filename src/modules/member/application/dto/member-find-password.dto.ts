import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// request
export class MemberFindPasswordReqDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly account: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}

// response : state & redirect to modify
