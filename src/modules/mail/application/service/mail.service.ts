import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailSendCertificationCodeReqDto } from 'src/modules/mail/application/dto/mail-send-certification-code.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(
    mailSendCertificationCodeReqDto: MailSendCertificationCodeReqDto,
  ): Promise<void | undefined> {
    try {
      await this.mailerService.sendMail({
        to: mailSendCertificationCodeReqDto.email,
        subject: '[Project Nyang] Authentication for Email ✔',
        template: 'certification_code',
        context: {
          code: mailSendCertificationCodeReqDto.certification_code,
        },
      });
    } catch (error) {
      throw new HttpException(
        'error An error has occurred in CertificationCodeService',
        HttpStatus.CONFLICT,
      );
    }
  }
}
