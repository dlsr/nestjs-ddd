import ExternalId from '../../../domain/external-id';

export const GET_AVATAR_BY_EXTERNAL_ID_USE_CASE =
  'GET_AVATAR_BY_EXTERNAL_ID_USE_CASE';
export interface GetAvatarByExternalIdUseCase {
  getAvatarByExternalId(externalId: ExternalId): Promise<string>;
}
