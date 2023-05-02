import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserRequest } from './create-user.request';

describe('CreateUserRequestSpec', () => {
  it('it should validate correcly', async () => {
    const payload = { email: 'email@test.com' };
    const createUserRequestDto = plainToInstance(CreateUserRequest, payload);
    const errors = await validate(createUserRequestDto);
    expect(errors.length).toBe(0);
  });

  it('it should return an must be an email error', async () => {
    const payload = { email: 'email' };
    const createUserRequestDto = plainToInstance(CreateUserRequest, payload);
    const errors = await validate(createUserRequestDto);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints.isEmail).toBe('email must be an email');
  });

  it('it should return email should not be empty error', async () => {
    const payload = { email: '' };
    const createUserRequestDto = plainToInstance(CreateUserRequest, payload);
    const errors = await validate(createUserRequestDto);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints.isNotEmpty).toBe('email should not be empty');
  });
});
