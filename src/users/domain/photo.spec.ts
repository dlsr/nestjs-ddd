import { PhotoTestFactory } from '../../../test/factories/photo-test.factory';

describe('Photo', () => {
  describe('it should instantiate a valid user', () => {
    it('when all informations are valid', () => {
      const photo = PhotoTestFactory.create();
      expect(photo).toBeDefined();
      expect(photo.userExternalId).toBe(PhotoTestFactory.validExternalId.id);
      expect(photo.hash).toBe(PhotoTestFactory.validHash);
    });
  });

  describe('it should trown an exception', () => {
    it('when externalId is null', () => {
      const invalidExternalId = null;
      expect(() =>
        PhotoTestFactory.create({
          externalId: invalidExternalId,
          hash: PhotoTestFactory.validHash,
        }),
      ).toThrow(new Error('UserExternalId is required'));
    });

    it('when hash is null', () => {
      const invalidHash = null;
      expect(() =>
        PhotoTestFactory.create({
          hash: invalidHash,
          externalId: PhotoTestFactory.validExternalId,
        }),
      ).toThrow(new Error('Hash is required'));
    });
  });
});
