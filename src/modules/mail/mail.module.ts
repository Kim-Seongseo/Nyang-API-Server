import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: 'projectnyang@gmail.com',
          pass: '#kle445#',
        },
        port: 465,
        secure: false,
      },
      defaults: {
        from: '"nest-modules" <nayng@nestjs.com>',
      },
      template: {
        dir: 'src/templates/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  // providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
