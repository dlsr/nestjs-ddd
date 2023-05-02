import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { PublishMessagePort } from '../../../application/ports/out/publish-message-port';

@Injectable()
export class MessageBrokerRMQAdapter implements PublishMessagePort {
  public constructor(@Inject('RMQ_ADAPTER') private client: ClientProxy) {}

  public publish(message: string): Observable<string> {
    return this.client.emit<string>('user_created', new Message(message));
  }
}

export class Message {
  text: string;

  constructor(text) {
    this.text = text;
  }
}
