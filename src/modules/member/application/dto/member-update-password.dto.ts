import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

// Request
export class MemberModifyPasswordReqDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly account: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

// response: state
