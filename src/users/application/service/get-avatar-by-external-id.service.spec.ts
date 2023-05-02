import { Test } from '@nestjs/testing';
import { UserTestFactory } from '../../../../test/factories/user-test.factory';
import {
  GET_AVATAR_BY_EXTERNAL_ID_USE_CASE,
  GetAvatarByExternalIdUseCase,
} from '../ports/in/get-avatar-by-external-id.usecase';
import {
  FIND_USER_BY_EXTERNAL_ID_PORT,
  FindUserByExternalIdPort,
} from '../ports/out/find-user-by-external-id.port';
import {
  FIND_PHOTO_BY_USER_EXTERNAL_ID_PORT,
  FindPhotoByUserExternalIdPort,
} from '../ports/out/find-photo-by-external-id.port';
import {
  DOWNLOAD_FILE_PORT,
  DownloadFilePort,
} from '../ports/out/download-file.port';
import {
  CREATE_PHOTO_PORT,
  CreatePhotoPort,
} from '../ports/out/create-photo.port';
import { GetAvatarByExternalIdService } from './get-avatar-by-external-id.service';
import { ExternalIdTestFactory } from '../../../../test/factories/external-id-test.factory';
import { PhotoTestFactory } from '../../../../test/factories/photo-test.factory';
import { FileSystemUtils } from '../../../@shared/file/file-system';
import { base64ImageBuffer } from '../../../../test/utils/base-64-image-buffer';

describe('GetAvatarByExternalIdService', () => {
  let service: GetAvatarByExternalIdUseCase;
  let findUserByExternalIdPort: FindUserByExternalIdPort;
  let findPhotoByExternalIdPort: FindPhotoByUserExternalIdPort;
  let downloadFilePort: DownloadFilePort;
  let createPhotoPort: CreatePhotoPort;
  let fileSystemUtils: FileSystemUtils;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        GetAvatarByExternalIdService,
        {
          provide: GET_AVATAR_BY_EXTERNAL_ID_USE_CASE,
          useValue: GetAvatarByExternalIdService,
        },
        {
          provide: FIND_USER_BY_EXTERNAL_ID_PORT,
          useValue: {
            findUserByExternalId: jest.fn(),
          },
        },
        {
          provide: FIND_PHOTO_BY_USER_EXTERNAL_ID_PORT,
          useValue: {
            findPhotoByExternalId: jest.fn(),
          },
        },
        {
          provide: DOWNLOAD_FILE_PORT,
          useValue: {
            download: jest.fn(),
          },
        },
        {
          provide: CREATE_PHOTO_PORT,
          useValue: {
            createPhoto: jest.fn(),
          },
        },
        {
          provide: FileSystemUtils,
          useValue: {
            writeFile: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<GetAvatarByExternalIdUseCase>(
      GetAvatarByExternalIdService,
    );
    findUserByExternalIdPort = moduleRef.get<FindUserByExternalIdPort>(
      FIND_USER_BY_EXTERNAL_ID_PORT,
    );
    findPhotoByExternalIdPort = moduleRef.get<FindPhotoByUserExternalIdPort>(
      FIND_PHOTO_BY_USER_EXTERNAL_ID_PORT,
    );
    downloadFilePort = moduleRef.get<DownloadFilePort>(DOWNLOAD_FILE_PORT);
    createPhotoPort = moduleRef.get<CreatePhotoPort>(CREATE_PHOTO_PORT);
    fileSystemUtils = moduleRef.get<FileSystemUtils>(FileSystemUtils);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(findUserByExternalIdPort).toBeDefined();
    expect(findPhotoByExternalIdPort).toBeDefined();
    expect(downloadFilePort).toBeDefined();
    expect(createPhotoPort).toBeDefined();
    expect(fileSystemUtils).toBeDefined();
  });

  describe('when call getAvatarByExternalId method', () => {
    describe('and a photo exists on database', () => {
      it('it should return a base 64 hash', async () => {
        const externalId = ExternalIdTestFactory.create();
        jest
          .spyOn(findPhotoByExternalIdPort, 'findPhotoByExternalId')
          .mockResolvedValue(PhotoTestFactory.create());
        const result = await service.getAvatarByExternalId(externalId);
        expect(result).toBe(PhotoTestFactory.validHash);
      });
    });
    describe('and a photo does not exist on database', () => {
      it('it should find an user, save the file localy, save the file in the database, and return a base 64 hash', async () => {
        const user = UserTestFactory.create();
        const expectedBase64ImageBuffer = base64ImageBuffer();
        jest
          .spyOn(findPhotoByExternalIdPort, 'findPhotoByExternalId')
          .mockResolvedValue(null);

        jest
          .spyOn(findUserByExternalIdPort, 'findUserByExternalId')
          .mockResolvedValue(user);

        jest
          .spyOn(downloadFilePort, 'download')
          .mockResolvedValue(expectedBase64ImageBuffer);

        const result = await service.getAvatarByExternalId(
          UserTestFactory.validExternalId,
        );
        expect(result).toBe(expectedBase64ImageBuffer);
        expect(fileSystemUtils.writeFile).toHaveBeenCalledTimes(1);
        expect(createPhotoPort.createPhoto).toHaveBeenCalledTimes(1);
      });
    });
  });
});
