import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePhotoPort } from '../../../application/ports/out/create-photo.port';
import { DeletePhotoPort } from '../../../application/ports/out/delete-photo.port';
import { FindPhotoByUserExternalIdPort } from '../../../application/ports/out/find-photo-by-external-id.port';
import ExternalId from '../../../domain/external-id';
import Photo from '../../../domain/photo';
import { PhotoDocument } from './photo.schema';

export class PhotoPersistenceAdapter
  implements CreatePhotoPort, FindPhotoByUserExternalIdPort, DeletePhotoPort
{
  public constructor(
    @InjectModel(PhotoDocument.name)
    private readonly photoModel: Model<PhotoDocument>,
  ) {}

  public async findPhotoByExternalId(externalId: ExternalId): Promise<Photo> {
    const photo = await this.photoModel.findOne({
      userExternalId: externalId.id,
    });

    if (photo) {
      return new Photo(new ExternalId(photo.userExternalId), photo.hash);
    }
    return null;
  }

  public async createPhoto(photo: Photo): Promise<Photo> {
    try {
      const photoModel = new this.photoModel({
        userExternalId: photo.userExternalId,
        hash: photo.hash,
      });
      await photoModel.save();
      return new Photo(new ExternalId(photoModel.userExternalId), photo.hash);
    } catch (error) {
      console.log(error);
      throw new Error(`Create User Error: ${error}`);
    }
  }

  public async delete(userExternalId: ExternalId): Promise<boolean> {
    const photoDeleted = await this.photoModel.deleteOne({
      userExternalId: userExternalId,
    });
    return photoDeleted.deletedCount > 0;
  }
}
