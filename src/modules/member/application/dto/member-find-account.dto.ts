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
  @ApiProperty()
  @Expose()
  @IsString()
  readonly account: string;

  @ApiProperty()
  @Expose()
  @IsString()
  readonly email: string;

  @ApiProperty()
  @Expose()
  @IsString()
  readonly name: string;
}
