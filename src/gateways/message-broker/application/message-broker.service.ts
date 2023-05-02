import { Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PublishMessageUseCase } from './ports/in/publish-message-use-case';
import {
  PublishMessagePort,
  PUBLISH_MESSAGE_PORT,
} from './ports/out/publish-message-port';

export class MessageBrokerService implements PublishMessageUseCase {
  public constructor(
    @Inject(PUBLISH_MESSAGE_PORT)
    private readonly publishMessagePort: PublishMessagePort,
  ) {}

  public publish(message: string): Observable<string> {
    return this.publishMessagePort.publish(message);
  }
}
