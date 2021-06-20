import { Module } from '@nestjs/common';
import { MailService } from './application/service/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          service: process.env.MAILER_TRANSPORT_SERVICE,
          host: process.env.MAILER_TRANSPORT_HOST,
          auth: {
            user: process.env.MAILER_TRANSPORT_AUTH_USER,
            pass: process.env.MAILER_TRANSPORT_AUTH_PASS,
          },
          port: process.env.MAILER_TRANSPORT_PORT,
          secure: process.env.MAILER_TRANSPORT_SECURE,
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
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
