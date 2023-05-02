import ExternalId from '../../../domain/external-id';

export const DELETE_PHOTO_USE_CASE = 'DELETE_PHOTO_USE_CASE';
export interface DeletePhotoUseCase {
  delete(userExternalId: ExternalId): Promise<void>;
}
