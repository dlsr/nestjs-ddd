import { UserTestFactory } from '../../../test/factories/user-test.factory';

describe('User', () => {
  describe('it should instantiate a valid user', () => {
    it('when all informations are valid', () => {
      const user = UserTestFactory.create();
      expect(user).toBeDefined();
      expect(user.email).toBe(UserTestFactory.validEmail.value);
      expect(user.id).toBe(UserTestFactory.validUserId.id);
      expect(user.externalId).toBe(UserTestFactory.validExternalId.id);
      expect(user.firstName).toBe(UserTestFactory.validFirstName);
      expect(user.lastName).toBe(UserTestFactory.validLastName);
      expect(user.avatar).toBe(UserTestFactory.validAvatar);
    });
  });

  describe('it should trown an exception', () => {
    it('when the email is null', () => {
      const invalidEmail = null;
      expect(() => UserTestFactory.create({ email: invalidEmail })).toThrow(
        new Error('Email is required'),
      );
    });
  });
});
