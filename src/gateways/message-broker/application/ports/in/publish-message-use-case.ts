import { Observable } from 'rxjs';

export const PUBLISH_MESSAGE_USE_CASE = 'PUBLISH_MESSAGE_USE_CASE';
export interface PublishMessageUseCase {
  publish(message: string): Observable<string>;
}
