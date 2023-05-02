import { CheckUndefinedOrReturnValue } from '../../src/@shared/utils/check-undefined-or-return-value';
import Email from '../../src/users/domain/email';

export class EmailTestFactory {
  static validEmail = 'email@test.com';
  static create(value?: string): Email {
    const email = CheckUndefinedOrReturnValue.check(value, this.validEmail);
    return new Email(email);
  }
}
