import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

// request
export class LoginReqDto {
  @ApiProperty()
  @IsString()
  readonly account: string;

  @ApiProperty()
  @IsString()
  readonly password: string;
}

// response
@Exclude()
export class LoginResDto {
  @Expose()
  readonly account: string;
  @Expose()
  readonly name: string;
}
