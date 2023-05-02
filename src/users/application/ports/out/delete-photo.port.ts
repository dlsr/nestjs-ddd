import ExternalId from '../../../domain/external-id';
export const DELETE_PHOTO_PORT = 'DELETE_PHOTO_PORT';
export interface DeletePhotoPort {
  delete(userExternalId: ExternalId): Promise<boolean>;
}
