import { Test } from '@nestjs/testing';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { UserTestFactory } from '../../../../test/factories/user-test.factory';
import UserCreatedEvent from '../../../@shared/event/user-created.event';
import { EventsNameEnum } from '../../../@shared/event/events.enum';
import SendEmailUserCreatedListener from './send-email-user-created.listener';
import {
  SEND_EMAIL_USE_CASE,
  SendEmailUseCase,
} from '../ports/out/send-email.usecase';

describe('SendEmailUserCreatedListener', () => {
  let listener: SendEmailUserCreatedListener;
  let sendEmailUseCase: SendEmailUseCase;
  let eventEmitter: EventEmitter2;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [EventEmitterModule.forRoot()],
      providers: [
        SendEmailUserCreatedListener,
        {
          provide: SEND_EMAIL_USE_CASE,
          useValue: {
            sendEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    await moduleRef.init();

    listener = moduleRef.get<SendEmailUserCreatedListener>(
      SendEmailUserCreatedListener,
    );
    sendEmailUseCase = moduleRef.get<SendEmailUseCase>(SEND_EMAIL_USE_CASE);
    eventEmitter = moduleRef.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(listener).toBeDefined();
    expect(sendEmailUseCase).toBeDefined();
    expect(eventEmitter).toBeDefined();
  });

  describe('when a created user event is emitted', () => {
    it('it should send an email', async () => {
      const user = UserTestFactory.create();
      eventEmitter.emit(
        EventsNameEnum.CREATED_USER,
        new UserCreatedEvent(user),
      );
      expect(sendEmailUseCase.sendEmail).toHaveBeenCalledTimes(1);
    });
  });
});
