import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsEnum, IsString } from 'class-validator';
import { CertificationType } from '../../domain/entity/certification-type.enum';

export class CertificationCodeEmailFindReqDto {
  @ApiProperty()
  @IsEnum(CertificationType)
  readonly type: CertificationType = CertificationType.EMAIL;

  @ApiProperty()
  @IsString()
  readonly contact_info: string;

  @ApiProperty()
  @IsString()
  readonly certification_code: string;
}

@Exclude()
export class CertificationCodeEmailFindResDto {
  @Expose()
  @IsString()
  readonly certification_code: string;

  @Expose()
  @IsDate()
  readonly create_date: Date;
}
