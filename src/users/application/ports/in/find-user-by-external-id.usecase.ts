import ExternalId from '../../../domain/external-id';
import User from '../../../domain/user';

export const FIND_USER_BY_ID_USE_CASE = 'FIND_USER_BY_ID_USE_CASE';
export interface FindUserByIdUseCase {
  findUserByExternalId(externalId: ExternalId): Promise<User>;
}
