import { Inject } from '@nestjs/common';
import ExternalId from '../../domain/external-id';
import { GetAvatarByExternalIdUseCase } from '../ports/in/get-avatar-by-external-id.usecase';
import {
  FindUserByExternalIdPort,
  FIND_USER_BY_EXTERNAL_ID_PORT,
} from '../ports/out/find-user-by-external-id.port';
import {
  FindPhotoByUserExternalIdPort,
  FIND_PHOTO_BY_USER_EXTERNAL_ID_PORT,
} from '../ports/out/find-photo-by-external-id.port';
import {
  DownloadFilePort,
  DOWNLOAD_FILE_PORT,
} from '../ports/out/download-file.port';
import {
  CreatePhotoPort,
  CREATE_PHOTO_PORT,
} from '../ports/out/create-photo.port';
import Photo from '../../domain/photo';
import { FileSystemUtils } from '../../../@shared/file/file-system';
import { FileType } from '../../../@shared/file/file-type.enum';

export class GetAvatarByExternalIdService
  implements GetAvatarByExternalIdUseCase
{
  public constructor(
    @Inject(FIND_USER_BY_EXTERNAL_ID_PORT)
    private readonly findUserByExternalIdPort: FindUserByExternalIdPort,
    @Inject(FIND_PHOTO_BY_USER_EXTERNAL_ID_PORT)
    private readonly findPhotoByExternalIdPort: FindPhotoByUserExternalIdPort,
    @Inject(DOWNLOAD_FILE_PORT)
    private readonly downloadFilePort: DownloadFilePort,
    @Inject(CREATE_PHOTO_PORT)
    private readonly createPhotoPort: CreatePhotoPort,
    private readonly fileSystemUtils: FileSystemUtils,
  ) {}

  public async getAvatarByExternalId(externalId: ExternalId): Promise<string> {
    const foundPhoto =
      await this.findPhotoByExternalIdPort.findPhotoByExternalId(externalId);

    if (foundPhoto) {
      return foundPhoto.hash;
    }

    const foundUserApi =
      await this.findUserByExternalIdPort.findUserByExternalId(externalId);
    const bufferBase64 = await this.downloadFilePort.download(
      foundUserApi.avatar,
    );
    const fileName = `${externalId.id}${FileType.JPG}`;
    this.fileSystemUtils.writeFile(fileName, bufferBase64);
    const photo = new Photo(
      new ExternalId(foundUserApi.externalId),
      bufferBase64,
    );
    await this.createPhotoPort.createPhoto(photo);
    return bufferBase64;
  }
}
