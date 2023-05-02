import { EmailTestFactory } from '../../../test/factories/email-test.factory';

describe('Email', () => {
  describe('it should instantiate a valid email', () => {
    it('when email is valid', () => {
      const email = EmailTestFactory.create();
      expect(email).toBeDefined();
      expect(email.value).toBe('email@test.com');
    });
  });

  describe('it should trown an exception', () => {
    it('when email is invalid', () => {
      const invalidEmail = 'email@';
      expect(() => EmailTestFactory.create(invalidEmail)).toThrow(
        new Error('Invalid Email'),
      );
    });

    it('when email is null', () => {
      const invalidEmail = null;
      expect(() => EmailTestFactory.create(invalidEmail)).toThrow(
        new Error('Invalid Email'),
      );
    });
  });
});
