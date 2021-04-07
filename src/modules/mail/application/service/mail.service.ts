import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async example2(): Promise<void | undefined> {
    await this.mailerService.sendMail({
      to: 'dubu4050@naver.com', // list of receivers
      from: 'projectnyang@gmail.com', // sender address
      subject: 'Testing Nest MailerModule ✔', // Subject line
      text: 'welcome', // plaintext body
      html: '<b>welcome</b>', // HTML body content
    });
  }
}
