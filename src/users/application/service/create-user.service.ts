import { Inject } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventsNameEnum } from '../../../@shared/event/events.enum';
import Email from '../../domain/email';
import UserCreatedEvent from '../../../@shared/event/user-created.event';
import User from '../../domain/user';
import { CreateUserUseCase } from '../ports/in/create-user.usecase';
import {
  CreateUserPort,
  CREATE_USER_PORT,
} from '../ports/out/create-user.port';

export class CreateUserService implements CreateUserUseCase {
  public constructor(
    @Inject(CREATE_USER_PORT)
    private readonly createUserPort: CreateUserPort,
    private eventEmitter: EventEmitter2,
  ) {}

  public async createUser(email: Email): Promise<User> {
    const user = await this.createUserPort.createUser(email);
    this.eventEmitter.emit(
      EventsNameEnum.CREATED_USER,
      new UserCreatedEvent(user),
    );
    return user;
  }
}
