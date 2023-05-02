import ExternalId from '../../../domain/external-id';
import User from '../../../domain/user';

export const FIND_USER_BY_EXTERNAL_ID_PORT = 'FIND_USER_BY_EXTERNAL_ID_PORT';
export interface FindUserByExternalIdPort {
  findUserByExternalId(externalId: ExternalId): Promise<User>;
}
