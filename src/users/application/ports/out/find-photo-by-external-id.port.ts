import ExternalId from '../../../domain/external-id';
import Photo from '../../../domain/photo';

export const FIND_PHOTO_BY_USER_EXTERNAL_ID_PORT =
  'FIND_PHOTO_BY_USER_EXTERNAL_ID_PORT';
export interface FindPhotoByUserExternalIdPort {
  findPhotoByExternalId(userExternalId: ExternalId): Promise<Photo>;
}
