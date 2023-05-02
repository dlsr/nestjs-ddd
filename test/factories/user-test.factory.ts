import { CheckUndefinedOrReturnValue } from '../../src/@shared/utils/check-undefined-or-return-value';
import Email from '../../src/users/domain/email';
import ExternalId from '../../src/users/domain/external-id';
import User from '../../src/users/domain/user';
import UserId from '../../src/users/domain/user-id';
import { EmailTestFactory } from './email-test.factory';
import { ExternalIdTestFactory } from './external-id-test.factory';
import { UserIdTestFactory } from './user-id-test.factory';

export class UserTestFactory {
  static validEmail = EmailTestFactory.create();
  static validUserId = UserIdTestFactory.create();
  static validExternalId = ExternalIdTestFactory.create();
  static validFirstName = 'dummyName';
  static validLastName = 'dummySecondName';
  static validAvatar = 'https://test.com.br';
  static create(
    param: {
      email?: Email;
      userId?: UserId;
      externalId?: ExternalId;
      firstName?: string;
      lastName?: string;
      avatar?: string;
    } = {},
  ): User {
    const email = CheckUndefinedOrReturnValue.check(
      param.email,
      this.validEmail,
    );
    const userId = CheckUndefinedOrReturnValue.check(
      param.userId,
      this.validUserId,
    );
    const externalId = CheckUndefinedOrReturnValue.check(
      param.externalId,
      this.validExternalId,
    );
    const firstName = this.validFirstName;
    const lastName = this.validLastName;
    const avatar = this.validAvatar;
    return new User(email, userId, externalId, firstName, lastName, avatar);
  }
}
