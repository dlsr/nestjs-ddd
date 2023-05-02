import { MailData } from '../../../../../@shared/mailing/mail-data';

export const SEND_EMAIL_PORT = 'SEND_EMAIL_PORT';
export interface SendEmailPort {
  sendEmail(mailData: MailData): Promise<boolean>;
}
