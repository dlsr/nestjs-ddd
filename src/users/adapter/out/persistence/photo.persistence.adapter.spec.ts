import { Test } from '@nestjs/testing';
import { DatabaseModule } from '../../../../database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from '../../../../database/database.service';
import { PhotoDocument, PhotoSchema } from './photo.schema';
import { PhotoPersistenceAdapter } from './photo.persistence.adapter';
import {
  CREATE_PHOTO_PORT,
  CreatePhotoPort,
} from '../../../application/ports/out/create-photo.port';
import {
  FIND_PHOTO_BY_USER_EXTERNAL_ID_PORT,
  FindPhotoByUserExternalIdPort,
} from '../../../application/ports/out/find-photo-by-external-id.port';
import { PhotoTestFactory } from '../../../../../test/factories/photo-test.factory';
import {
  DELETE_PHOTO_PORT,
  DeletePhotoPort,
} from '../../../application/ports/out/delete-photo.port';

describe('PhotoPersistenceAdapter', () => {
  let createPhotoPort: CreatePhotoPort;
  let findPhotoByUserExternalIdPort: FindPhotoByUserExternalIdPort;
  let deletePhotoPort: DeletePhotoPort;
  let databaseService: DatabaseService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([
          {
            name: PhotoDocument.name,
            schema: PhotoSchema,
          },
        ]),
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        DatabaseModule,
      ],
      providers: [
        PhotoPersistenceAdapter,
        {
          provide: CREATE_PHOTO_PORT,
          useClass: PhotoPersistenceAdapter,
        },
        {
          provide: FIND_PHOTO_BY_USER_EXTERNAL_ID_PORT,
          useClass: PhotoPersistenceAdapter,
        },
        {
          provide: DELETE_PHOTO_PORT,
          useClass: PhotoPersistenceAdapter,
        },
      ],
    }).compile();

    createPhotoPort = moduleRef.get<CreatePhotoPort>(CREATE_PHOTO_PORT);
    findPhotoByUserExternalIdPort =
      moduleRef.get<FindPhotoByUserExternalIdPort>(
        FIND_PHOTO_BY_USER_EXTERNAL_ID_PORT,
      );
    deletePhotoPort = moduleRef.get<DeletePhotoPort>(DELETE_PHOTO_PORT);
    databaseService = moduleRef.get<DatabaseService>(DatabaseService);
  });

  describe('createPhoto', () => {
    it('it should create a photo correctly', async () => {
      const result = await createPhotoPort.createPhoto(
        PhotoTestFactory.create(),
      );
      expect(result.hash).toBe(PhotoTestFactory.validHash);
      expect(result.userExternalId).toBe(PhotoTestFactory.validExternalId.id);
      const model = databaseService.getDbHandle().model(PhotoDocument.name);
      await model.findOneAndDelete({ userExternalId: result.userExternalId });
    });
  });

  describe('findPhotoByExternalId', () => {
    it('it should find a photo correctly', async () => {
      const model = databaseService.getDbHandle().model(PhotoDocument.name);
      const photoModel = await model.create({
        userExternalId: PhotoTestFactory.validExternalId.id,
        hash: PhotoTestFactory.validHash,
      });
      await photoModel.save();
      const result = await findPhotoByUserExternalIdPort.findPhotoByExternalId(
        PhotoTestFactory.validExternalId,
      );
      expect(result.userExternalId).toBe(PhotoTestFactory.validExternalId.id);
      expect(result.hash).toBe(PhotoTestFactory.validHash);
      await model.findOneAndDelete({ userExternalId: result.userExternalId });
    });
  });

  describe('delete', () => {
    it('it should delete a photo correctly', async () => {
      const model = databaseService.getDbHandle().model(PhotoDocument.name);
      const photoModel = await model.create({
        userExternalId: PhotoTestFactory.validExternalId.id,
        hash: PhotoTestFactory.validHash,
      });
      await photoModel.save();
      const result = await deletePhotoPort.delete(
        PhotoTestFactory.validExternalId,
      );
      expect(result).toBe(true);
      const foundPhoto = await model.findOne({
        userExternalId: PhotoTestFactory.validExternalId.id,
      });
      expect(foundPhoto).toBe(null);
    });

    it('it should not delete a photo when it does not exist on database', async () => {
      const result = await deletePhotoPort.delete(
        PhotoTestFactory.validExternalId,
      );
      expect(result).toBe(false);
    });
  });

  afterAll(async () => {
    await databaseService.getDbHandle().close();
  });
});
