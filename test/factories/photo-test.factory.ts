import { CheckUndefinedOrReturnValue } from '../../src/@shared/utils/check-undefined-or-return-value';
import ExternalId from '../../src/users/domain/external-id';
import Photo from '../../src/users/domain/photo';
import { ExternalIdTestFactory } from './external-id-test.factory';

export class PhotoTestFactory {
  static validExternalId = ExternalIdTestFactory.create();
  static validHash = 'dGVzdA==';
  static create(param: { externalId?: ExternalId; hash?: string } = {}): Photo {
    const externalId = CheckUndefinedOrReturnValue.check(
      param.externalId,
      this.validExternalId,
    );
    const hash = CheckUndefinedOrReturnValue.check(param.hash, this.validHash);
    return new Photo(externalId, hash);
  }
}
