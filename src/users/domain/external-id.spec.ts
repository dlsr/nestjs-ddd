import { ExternalIdTestFactory } from '../../../test/factories/external-id-test.factory';

describe('ExternalId', () => {
  describe('it should instantiate a valid externalId', () => {
    it('when id is valid', () => {
      const userId = ExternalIdTestFactory.create();
      expect(userId).toBeDefined();
      expect(userId.id).toBe(ExternalIdTestFactory.validExternalId);
    });
  });

  describe('it should trown an exception', () => {
    it('when id is null', () => {
      const invalidId = null;
      expect(() => ExternalIdTestFactory.create(invalidId)).toThrow(
        new Error('Invalid External Id'),
      );
    });
  });
});
