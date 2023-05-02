import { Test } from '@nestjs/testing';
import {
  DELETE_PHOTO_PORT,
  DeletePhotoPort,
} from '../ports/out/delete-photo.port';
import { DeletePhotoUseCase } from '../ports/in/delete-photo.usecase';
import { DeletePhotoService } from './delete-photo.service';
import { ExternalIdTestFactory } from '../../../../test/factories/external-id-test.factory';
import { FileSystemUtils } from '../../../@shared/file/file-system';

describe('DeletePhotoService', () => {
  let service: DeletePhotoUseCase;
  let deletePhotoPort: DeletePhotoPort;
  let fileSystemUtils: FileSystemUtils;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DeletePhotoService,
        {
          provide: FileSystemUtils,
          useValue: {
            delete: jest.fn(),
          },
        },
        {
          provide: DELETE_PHOTO_PORT,
          useValue: {
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<DeletePhotoService>(DeletePhotoService);
    deletePhotoPort = moduleRef.get<DeletePhotoPort>(DELETE_PHOTO_PORT);
    fileSystemUtils = moduleRef.get<FileSystemUtils>(FileSystemUtils);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(deletePhotoPort).toBeDefined();
    expect(fileSystemUtils).toBeDefined();
  });

  describe('when call delete method', () => {
    it('it should delete the file localy and on storage', async () => {
      const externalId = ExternalIdTestFactory.create();
      await service.delete(externalId);
      expect(deletePhotoPort.delete).toHaveBeenCalledTimes(1);
      expect(fileSystemUtils.delete).toHaveBeenCalledTimes(1);
    });
  });
});
