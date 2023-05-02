import { Observable } from 'rxjs';

export const PUBLISH_MESSAGE_PORT = 'PUBLISH_MESSAGE_PORT';
export interface PublishMessagePort {
  publish(message: string): Observable<string>;
}
