import { CheckUndefinedOrReturnValue } from '../../src/@shared/utils/check-undefined-or-return-value';
import UserId from '../../src/users/domain/user-id';

export class UserIdTestFactory {
  static id = '12F';
  static create(value?: string): UserId {
    const userId = CheckUndefinedOrReturnValue.check(value, this.id);
    return new UserId(userId);
  }
}
