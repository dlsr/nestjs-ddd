import { Test } from '@nestjs/testing';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { UserTestFactory } from '../../../../test/factories/user-test.factory';
import PublishMessageUserCreatedListener from './publish-message-user-created.listener';
import UserCreatedEvent from '../../../@shared/event/user-created.event';
import { EventsNameEnum } from '../../../@shared/event/events.enum';
import {
  PUBLISH_MESSAGE_USE_CASE,
  PublishMessageUseCase,
} from '../ports/out/publish-message-use-case';

describe('PublishMessageUserCreatedListener', () => {
  let listener: PublishMessageUserCreatedListener;
  let publishMessageUseCase: PublishMessageUseCase;
  let eventEmitter: EventEmitter2;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [EventEmitterModule.forRoot()],
      providers: [
        PublishMessageUserCreatedListener,
        {
          provide: PUBLISH_MESSAGE_USE_CASE,
          useValue: {
            publish: jest.fn(),
          },
        },
      ],
    }).compile();

    await moduleRef.init();

    listener = moduleRef.get<PublishMessageUserCreatedListener>(
      PublishMessageUserCreatedListener,
    );
    publishMessageUseCase = moduleRef.get<PublishMessageUseCase>(
      PUBLISH_MESSAGE_USE_CASE,
    );
    eventEmitter = moduleRef.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(listener).toBeDefined();
    expect(publishMessageUseCase).toBeDefined();
    expect(eventEmitter).toBeDefined();
  });

  describe('when a created user event is emitted', () => {
    it('it should publish a message on the queue', async () => {
      const user = UserTestFactory.create();
      eventEmitter.emit(
        EventsNameEnum.CREATED_USER,
        new UserCreatedEvent(user),
      );
      expect(publishMessageUseCase.publish).toHaveBeenCalledTimes(1);
    });
  });
});
