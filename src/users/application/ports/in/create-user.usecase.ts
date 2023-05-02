import Email from '../../../domain/email';
import User from '../../../domain/user';

export const CREATE_USER_USE_CASE = 'CREATE_USER_USE_CASE';
export interface CreateUserUseCase {
  createUser(email: Email): Promise<User>;
}
