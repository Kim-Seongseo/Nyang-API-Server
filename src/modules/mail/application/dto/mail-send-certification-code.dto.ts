import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

// request
@Exclude()
export class MailSendCertificationCodeReqDto {
  @Expose()
  @IsEmail()
  readonly email: string;

  @Expose()
  @IsString()
  readonly certification_code: string;
}

// response : none
