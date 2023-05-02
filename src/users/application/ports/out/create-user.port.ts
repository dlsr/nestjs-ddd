import Email from '../../../domain/email';
import User from '../../../domain/user';

export const CREATE_USER_PORT = 'CREATE_USER_PORT';
export interface CreateUserPort {
  createUser(email: Email): Promise<User>;
}
