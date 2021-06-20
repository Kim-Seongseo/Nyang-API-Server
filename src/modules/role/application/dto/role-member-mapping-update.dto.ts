import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

//req
export class RoleMemberMappingUpdateReqDto {
  @ApiProperty()
  @IsNumber()
  identifier: number;

  @ApiProperty()
  @IsString()
  Role: string;
}

//res
