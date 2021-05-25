import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

// Request
export class MemberUpdateReqDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly nickname: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly phone_number: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly date_birth: Date;

  @ApiProperty({ type: 'file', format: 'binary', required: false })
  @IsOptional()
  file: Express.Multer.File;
}

// response: state
