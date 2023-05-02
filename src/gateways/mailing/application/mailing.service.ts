import { Inject } from '@nestjs/common';
import { MailData } from '../../../@shared/mailing/mail-data';
import { SendEmailUseCase } from './ports/in/send-email.usecase';
import { SendEmailPort, SEND_EMAIL_PORT } from './ports/out/send-email.port';

export class MailingService implements SendEmailUseCase {
  public constructor(
    @Inject(SEND_EMAIL_PORT) private readonly sendEmailPort: SendEmailPort,
  ) {}
  public async sendEmail(mailData: MailData): Promise<boolean> {
    return this.sendEmailPort.sendEmail(mailData);
  }
}
