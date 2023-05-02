import { Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import EventHandlerInterface from '../../../@shared/event/event-handler.interface';
import { EventsNameEnum } from '../../../@shared/event/events.enum';
import UserCreatedEvent from '../../../@shared/event/user-created.event';
import {
  PUBLISH_MESSAGE_USE_CASE,
  PublishMessageUseCase,
} from '../ports/out/publish-message-use-case';

export default class PublishMessageUserCreatedListener
  implements EventHandlerInterface<UserCreatedEvent>
{
  constructor(
    @Inject(PUBLISH_MESSAGE_USE_CASE)
    private readonly publishMessageUseCase: PublishMessageUseCase,
  ) {}

  @OnEvent(EventsNameEnum.CREATED_USER)
  async handle(event: UserCreatedEvent): Promise<void> {
    this.publishMessageUseCase.publish(event.eventData.email);
  }
}
