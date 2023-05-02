import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { MailData } from '../../../../@shared/mailing/mail-data';
import { SendEmailPort } from '../../application/ports/out/send-email.port';

let VERIFIED_FROM_EMAIL = 'danillolsrios@gmail.com';

@Injectable()
export class MailingSendGridAdapter implements SendEmailPort {
  constructor(private readonly configService: ConfigService) {
    const sendGridApiKey = this.configService.get<string>('SENDGRID_API_KEY');
    VERIFIED_FROM_EMAIL = this.configService.get<string>(
      'SENDGRID_VERIFIED_FROM_EMAIL',
    );
    SendGrid.setApiKey(sendGridApiKey);
  }

  async sendEmail(mailData: MailData): Promise<boolean> {
    try {
      const mail = {
        ...mailData,
        from: VERIFIED_FROM_EMAIL,
      } as SendGrid.MailDataRequired;
      await SendGrid.send(mail);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
