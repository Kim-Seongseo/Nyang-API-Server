import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// request
export class MemberFindAccountReqDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}

// response
@Exclude()
export class MemberFindAccountResDto {
  @Expose()
  @IsString()
  readonly account: string;

  @Expose()
  @IsString()
  readonly email: string;

  @Expose()
  @IsString()
  readonly name: string;
}
