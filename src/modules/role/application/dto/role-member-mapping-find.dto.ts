import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { RoleType } from '../../domain/type/role-type.enum';

@Exclude()
export class RoleMemberMappingFindResDto {
  @Expose()
  @IsNumber()
  identifier: number;

  @Expose()
  @IsString()
  account: string;

  @Expose()
  @IsString()
  nickname: string;

  @Expose()
  @IsDate()
  date_register: Date;

  @Expose()
  @IsEnum({ type: 'enum', enum: RoleType })
  role: RoleType;
}
