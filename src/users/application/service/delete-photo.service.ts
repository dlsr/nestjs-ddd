import { Inject } from '@nestjs/common';
import ExternalId from '../../domain/external-id';
import { DeletePhotoUseCase } from '../ports/in/delete-photo.usecase';
import {
  DeletePhotoPort,
  DELETE_PHOTO_PORT,
} from '../ports/out/delete-photo.port';
import { FileSystemUtils } from '../../../@shared/file/file-system';
import { FileType } from '../../../@shared/file/file-type.enum';

export class DeletePhotoService implements DeletePhotoUseCase {
  public constructor(
    @Inject(DELETE_PHOTO_PORT)
    private readonly deletePort: DeletePhotoPort,
    private readonly fileSystemUtils: FileSystemUtils,
  ) {}

  public async delete(externalId: ExternalId): Promise<void> {
    await this.deletePort.delete(externalId);
    this.fileSystemUtils.delete(`${externalId.id}${FileType.JPG}`);
  }
}
