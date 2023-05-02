import { Module } from '@nestjs/common';
import { MailingSendGridAdapter } from './adapter/out/mailing-sendgrid.adapter';
import { MailingService } from './application/mailing.service';
import { SEND_EMAIL_USE_CASE } from './application/ports/in/send-email.usecase';
import { SEND_EMAIL_PORT } from './application/ports/out/send-email.port';

const sendEmailPortProvider = {
  provide: SEND_EMAIL_PORT,
  useClass: MailingSendGridAdapter,
};

const sendEmailUseCaseProvider = {
  provide: SEND_EMAIL_USE_CASE,
  useClass: MailingService,
};

@Module({
  providers: [
    MailingService,
    MailingSendGridAdapter,
    sendEmailPortProvider,
    sendEmailUseCaseProvider,
  ],
  exports: [sendEmailUseCaseProvider],
})
export class MailingModule {}
