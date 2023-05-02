import { Test } from '@nestjs/testing';
import { DatabaseModule } from '../../../../database/database.module';
import { UsersPersistenceAdapter } from './user.persistence.adapter';
import {
  CREATE_USER_PORT,
  CreateUserPort,
} from '../../../application/ports/out/create-user.port';
import Email from '../../../domain/email';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, UserSchema } from './user.schema';
import { DatabaseService } from '../../../../database/database.service';
import { UserTestFactory } from '../../../../../test/factories/user-test.factory';
import {
  FIND_USER_BY_EXTERNAL_ID_PORT,
  FindUserByExternalIdPort,
} from '../../../application/ports/out/find-user-by-external-id.port';

describe('UserPersistenceAdapter', () => {
  let createUserPort: CreateUserPort;
  let findUserByExternalIdPort: FindUserByExternalIdPort;
  let databaseService: DatabaseService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([
          {
            name: UserDocument.name,
            schema: UserSchema,
          },
        ]),
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        DatabaseModule,
      ],
      providers: [
        UsersPersistenceAdapter,
        {
          provide: CREATE_USER_PORT,
          useClass: UsersPersistenceAdapter,
        },
        {
          provide: FIND_USER_BY_EXTERNAL_ID_PORT,
          useClass: UsersPersistenceAdapter,
        },
      ],
    }).compile();

    createUserPort = moduleRef.get<CreateUserPort>(CREATE_USER_PORT);
    findUserByExternalIdPort = moduleRef.get<FindUserByExternalIdPort>(
      FIND_USER_BY_EXTERNAL_ID_PORT,
    );
    databaseService = moduleRef.get<DatabaseService>(DatabaseService);
  });

  describe('createUser', () => {
    it('it should create an user correctly', async () => {
      const email = new Email('email@test.com');
      const result = await createUserPort.createUser(email);
      expect(result.email).toBe(email.value);
      const model = databaseService.getDbHandle().model(UserDocument.name);
      await model.findByIdAndRemove(result.id);
    });
  });

  describe('findUserByExternalId', () => {
    it('it should find an user correctly', async () => {
      const model = databaseService.getDbHandle().model(UserDocument.name);
      const userModel = await model.create({
        email: UserTestFactory.validEmail.value,
        externalId: UserTestFactory.validExternalId.id,
      });
      await userModel.save();
      const result = await findUserByExternalIdPort.findUserByExternalId(
        UserTestFactory.validExternalId,
      );
      expect(result.email).toBe(UserTestFactory.validEmail.value);
      expect(result.externalId).toBe(UserTestFactory.validExternalId.id);
      await model.findByIdAndRemove(result.id);
    });
  });

  afterAll(async () => {
    await databaseService.getDbHandle().close();
  });
});
