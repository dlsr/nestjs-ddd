import { Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import EventHandlerInterface from '../../../@shared/event/event-handler.interface';
import { EventsNameEnum } from '../../../@shared/event/events.enum';
import { MailData } from '../../../@shared/mailing/mail-data';
import UserCreatedEvent from '../../../@shared/event/user-created.event';
import {
  SendEmailUseCase,
  SEND_EMAIL_USE_CASE,
} from '../ports/out/send-email.usecase';

export default class SendEmailUserCreatedListener
  implements EventHandlerInterface<UserCreatedEvent>
{
  constructor(
    @Inject(SEND_EMAIL_USE_CASE)
    private readonly sendEmailUseCase: SendEmailUseCase,
  ) {}

  @OnEvent(EventsNameEnum.CREATED_USER)
  async handle(event: UserCreatedEvent): Promise<void> {
    const mailData: MailData = {
      to: event.eventData.email,
      subject: 'Test',
      text: 'Test',
      html: '<h1> New User </h1>',
    };

    await this.sendEmailUseCase.sendEmail(mailData);
  }
}
