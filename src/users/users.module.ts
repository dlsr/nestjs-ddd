import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { MailingModule } from '../gateways/mailing/mailing.module';
import { MessageBrokerModule } from '../gateways/message-broker/message-broker.module';
import { UsersController } from './adapter/in/web/users.controller';
import { UsersApiAdapter } from './adapter/out/api/users-api.adapter';
import { UsersPersistenceAdapter } from './adapter/out/persistence/user.persistence.adapter';
import {
  UserDocument,
  UserSchema,
} from './adapter/out/persistence/user.schema';
import SendEmailUserCreatedListener from './application/handler/send-email-user-created.listener';
import { FIND_USER_BY_ID_USE_CASE } from './application/ports/in/find-user-by-external-id.usecase';
import { CREATE_USER_USE_CASE } from './application/ports/in/create-user.usecase';
import { FIND_USER_BY_EXTERNAL_ID_PORT } from './application/ports/out/find-user-by-external-id.port';
import { CREATE_USER_PORT } from './application/ports/out/create-user.port';
import { FindUserByExternalIdService } from './application/service/find-user-by-external-id.service';
import { CreateUserService } from './application/service/create-user.service';
import { FIND_PHOTO_BY_USER_EXTERNAL_ID_PORT } from './application/ports/out/find-photo-by-external-id.port';
import { GET_AVATAR_BY_EXTERNAL_ID_USE_CASE } from './application/ports/in/get-avatar-by-external-id.usecase';
import { GetAvatarByExternalIdService } from './application/service/get-avatar-by-external-id.service';
import { DOWNLOAD_FILE_PORT } from './application/ports/out/download-file.port';
import {
  PhotoDocument,
  PhotoSchema,
} from './adapter/out/persistence/photo.schema';
import { CREATE_PHOTO_PORT } from './application/ports/out/create-photo.port';
import { PhotoPersistenceAdapter } from './adapter/out/persistence/photo.persistence.adapter';
import { DELETE_PHOTO_PORT } from './application/ports/out/delete-photo.port';
import { DELETE_PHOTO_USE_CASE } from './application/ports/in/delete-photo.usecase';
import { DeletePhotoService } from './application/service/delete-photo.service';
import PublishMessageUserCreatedListener from './application/handler/publish-message-user-created.listener';
import { FileSystemUtils } from '../@shared/file/file-system';

const createUserPortProvider = {
  provide: CREATE_USER_PORT,
  useClass: UsersPersistenceAdapter,
};

const createUserUseCaseProvider = {
  provide: CREATE_USER_USE_CASE,
  useClass: CreateUserService,
};

const findUserByExternalIdApiPortProvider = {
  provide: FIND_USER_BY_EXTERNAL_ID_PORT,
  useClass: UsersApiAdapter,
};

const findUserByExternalIdDbPortProvider = {
  provide: FIND_PHOTO_BY_USER_EXTERNAL_ID_PORT,
  useClass: UsersPersistenceAdapter,
};

const findUserUseCaseProvider = {
  provide: FIND_USER_BY_ID_USE_CASE,
  useClass: FindUserByExternalIdService,
};

const getAvatarByExternalIdUseCaseProvider = {
  provide: GET_AVATAR_BY_EXTERNAL_ID_USE_CASE,
  useClass: GetAvatarByExternalIdService,
};

const getAvatarByExternalIdPortProvider = {
  provide: DOWNLOAD_FILE_PORT,
  useClass: UsersApiAdapter,
};

const findPhotoByExternalIdProvider = {
  provide: FIND_PHOTO_BY_USER_EXTERNAL_ID_PORT,
  useClass: PhotoPersistenceAdapter,
};

const createPhotoPortProvider = {
  provide: CREATE_PHOTO_PORT,
  useClass: PhotoPersistenceAdapter,
};

const deletePhotoUseCaseProvider = {
  provide: DELETE_PHOTO_USE_CASE,
  useClass: DeletePhotoService,
};

const deletePhotoPortProvider = {
  provide: DELETE_PHOTO_PORT,
  useClass: PhotoPersistenceAdapter,
};

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserDocument.name,
        schema: UserSchema,
      },
      {
        name: PhotoDocument.name,
        schema: PhotoSchema,
      },
    ]),
    HttpModule,
    MessageBrokerModule,
    MailingModule,
    EventEmitterModule,
  ],
  controllers: [UsersController],
  providers: [
    CreateUserService,
    FindUserByExternalIdService,
    GetAvatarByExternalIdService,
    UsersApiAdapter,
    SendEmailUserCreatedListener,
    PublishMessageUserCreatedListener,
    PhotoPersistenceAdapter,
    FileSystemUtils,
    createUserPortProvider,
    createUserUseCaseProvider,
    findUserUseCaseProvider,
    findUserByExternalIdApiPortProvider,
    findUserByExternalIdDbPortProvider,
    getAvatarByExternalIdUseCaseProvider,
    getAvatarByExternalIdPortProvider,
    findPhotoByExternalIdProvider,
    createPhotoPortProvider,
    deletePhotoUseCaseProvider,
    deletePhotoPortProvider,
  ],
})
export class UsersModule {}
