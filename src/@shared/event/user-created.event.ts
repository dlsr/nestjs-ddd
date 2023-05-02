import EventInterface from './event.interface';

export default class UserCreatedEvent implements EventInterface {
  eventData: any;

  constructor(eventData: any) {
    this.eventData = eventData;
  }
}
