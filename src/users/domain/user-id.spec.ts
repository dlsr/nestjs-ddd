import { UserIdTestFactory } from '../../../test/factories/user-id-test.factory';

describe('UserId', () => {
  describe('it should instantiate a valid userId', () => {
    it('when id is valid', () => {
      const userId = UserIdTestFactory.create();
      expect(userId).toBeDefined();
      expect(userId.id).toBe('12F');
    });
  });

  describe('it should trown an exception', () => {
    it('when id is null', () => {
      expect(() => UserIdTestFactory.create(null)).toThrow(
        new Error('Invalid User Id'),
      );
    });
  });
});
