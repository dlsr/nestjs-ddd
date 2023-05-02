import { CheckUndefinedOrReturnValue } from '../../src/@shared/utils/check-undefined-or-return-value';
import ExternalId from '../../src/users/domain/external-id';

export class ExternalIdTestFactory {
  static validExternalId = 12;
  static create(value?: string): ExternalId {
    const externalId = CheckUndefinedOrReturnValue.check(
      value,
      this.validExternalId,
    );
    return new ExternalId(externalId);
  }
}
