import { Test } from '@nestjs/testing';
import {
  CreateUserPort,
  CREATE_USER_PORT,
} from '../ports/out/create-user.port';
import { CreateUserService } from './create-user.service';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import {
  CreateUserUseCase,
  CREATE_USER_USE_CASE,
} from '../ports/in/create-user.usecase';
import { EmailTestFactory } from '../../../../test/factories/email-test.factory';
import { UserTestFactory } from '../../../../test/factories/user-test.factory';

describe('CreateUserService', () => {
  let service: CreateUserUseCase;
  let createUserPort: CreateUserPort;
  let eventEmitter: EventEmitter2;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [EventEmitterModule],
      providers: [
        CreateUserService,
        EventEmitter2,
        {
          provide: CREATE_USER_USE_CASE,
          useValue: CreateUserService,
        },
        {
          provide: CREATE_USER_PORT,
          useValue: {
            createUser: jest.fn(),
          },
        },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<CreateUserService>(CreateUserService);
    createUserPort = moduleRef.get<CreateUserPort>(CREATE_USER_PORT);
    eventEmitter = moduleRef.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(createUserPort).toBeDefined();
    expect(eventEmitter).toBeDefined();
  });

  describe('when call createUser method', () => {
    const validEmail = EmailTestFactory.create();
    describe('with valid email', () => {
      it('should create a new user correctly', async () => {
        jest
          .spyOn(createUserPort, 'createUser')
          .mockResolvedValue(UserTestFactory.create());

        const user = await service.createUser(validEmail);
        expect(user.id).toBe(UserTestFactory.validUserId.id);
        expect(user.email).toBe(UserTestFactory.validEmail.value);
        expect(createUserPort.createUser).toHaveBeenCalledTimes(1);
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1);
      });

      it('should throw an expection', () => {
        jest
          .spyOn(createUserPort, 'createUser')
          .mockRejectedValueOnce(new Error());
        const result = () => service.createUser(validEmail);
        expect(result).rejects.toThrowError();
      });
    });
  });
});
