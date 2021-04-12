import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';
import { CertificationType } from '../../domain/entity/certification-type.enum';

@Exclude()
export class CertificationCodeEmailCreateReqDto {
  @Expose()
  @IsEnum(CertificationType)
  readonly type: CertificationType = CertificationType.EMAIL;

  @Expose()
  @IsString()
  readonly contact_info: string;

  @Expose()
  @IsString()
  readonly certification_code: string;
}
