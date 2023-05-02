import Photo from '../../../domain/photo';
export const CREATE_PHOTO_PORT = 'CREATE_PHOTO_PORT';
export interface CreatePhotoPort {
  createPhoto(photo: Photo): Promise<Photo>;
}
