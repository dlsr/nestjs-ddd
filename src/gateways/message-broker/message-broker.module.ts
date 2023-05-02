import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MessageBrokerRMQAdapter } from './adapter/out/rmq/message-broker-rmq.adapter';
import { MessageBrokerService } from './application/message-broker.service';
import { PUBLISH_MESSAGE_USE_CASE } from './application/ports/in/publish-message-use-case';
import { PUBLISH_MESSAGE_PORT } from './application/ports/out/publish-message-port';

const emitMessageUseCaseProvider = {
  provide: PUBLISH_MESSAGE_USE_CASE,
  useClass: MessageBrokerService,
};

const emitMessagePortProvider = {
  provide: PUBLISH_MESSAGE_PORT,
  useClass: MessageBrokerRMQAdapter,
};

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'RMQ_ADAPTER',
        useFactory: () => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
            ],
            queue: 'payever_queue',
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
  ],
  providers: [
    MessageBrokerService,
    MessageBrokerRMQAdapter,
    emitMessageUseCaseProvider,
    emitMessagePortProvider,
  ],
  exports: [emitMessageUseCaseProvider],
})
export class MessageBrokerModule {}
