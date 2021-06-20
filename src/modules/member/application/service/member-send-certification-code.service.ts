import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CertificationCodeEmailCreateReqDto } from 'src/modules/certification-code/application/dto/certification-code-email-create.dto';
import { CertificationCodeService } from 'src/modules/certification-code/application/service/certification-code.service';
import { MailSendCertificationCodeReqDto } from 'src/modules/mail/application/dto/mail-send-certification-code.dto';
import { MailService } from 'src/modules/mail/application/service/mail.service';
import { MemberRepository } from '../../infrastructure/persistence/repository/member.repository';
import { uuid } from 'uuidv4';

@Injectable()
export class MemberSendCertificationCodeService {
  constructor(
    private certificationCodeService: CertificationCodeService,
    private mailService: MailService,
  ) {}

  async sendCertificationCode(email: string): Promise<void | undefined> {
    let certification_code = uuid();
    certification_code = certification_code.slice(
      -20,
      certification_code.length,
    );

    /*for certification_code*/
    try {
      await this.certificationCodeService.insert(
        plainToClass(CertificationCodeEmailCreateReqDto, {
          contact_info: email,
          certification_code,
        }),
      );
    } catch (error) {
      throw new HttpException(
        'error An error has occurred in CertificationCodeService',
        HttpStatus.CONFLICT,
      );
    }

    /*for mail*/
    const mailSendCertificationCodeReqDto: MailSendCertificationCodeReqDto = plainToClass(
      MailSendCertificationCodeReqDto,
      {
        email: email,
        certification_code,
      },
    );
    return this.mailService.sendMail(mailSendCertificationCodeReqDto);
  }
}
