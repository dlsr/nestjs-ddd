import { MailData } from '../../../../@shared/mailing/mail-data';

export const SEND_EMAIL_USE_CASE = 'SEND_EMAIL_USE_CASE';
export interface SendEmailUseCase {
  sendEmail(mailData: MailData): Promise<boolean>;
}
