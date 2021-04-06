import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

// Request
export class UpdateMemberReqDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly nickname: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly phone_number: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly date_birth: Date;
}

// response: state
