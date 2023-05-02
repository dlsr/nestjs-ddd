import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import {
  CreateUserUseCase,
  CREATE_USER_USE_CASE,
} from '../../../application/ports/in/create-user.usecase';
import {
  FindUserByIdUseCase,
  FIND_USER_BY_ID_USE_CASE,
} from '../../../application/ports/in/find-user-by-external-id.usecase';
import { CreateUserRequest } from './dto/create-user.request';
import Email from '../../../domain/email';
import { CreateUserResponse } from './dto/create-user.response';
import { FindUserByIdResponse } from './dto/find-user-by-id.response';
import ExternalId from '../../../domain/external-id';
import {
  GetAvatarByExternalIdUseCase,
  GET_AVATAR_BY_EXTERNAL_ID_USE_CASE,
} from '../../../application/ports/in/get-avatar-by-external-id.usecase';
import {
  DeletePhotoUseCase,
  DELETE_PHOTO_USE_CASE,
} from '../../../application/ports/in/delete-photo.usecase';

@Controller('api/users')
export class UsersController {
  public constructor(
    @Inject(CREATE_USER_USE_CASE)
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject(FIND_USER_BY_ID_USE_CASE)
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    @Inject(GET_AVATAR_BY_EXTERNAL_ID_USE_CASE)
    private readonly getAvatarByExternalIdUseCase: GetAvatarByExternalIdUseCase,
    @Inject(DELETE_PHOTO_USE_CASE)
    private readonly deletePhotoUseCase: DeletePhotoUseCase,
  ) {}

  @Post()
  public async registerUser(
    @Body() payload: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    const email = new Email(payload.email);
    const result = await this.createUserUseCase.createUser(email);

    return {
      email: result.email,
    };
  }

  @Get(':id')
  public async findUser(
    @Param('id') externalId: number,
  ): Promise<FindUserByIdResponse> {
    const user = await this.findUserByIdUseCase.findUserByExternalId(
      new ExternalId(externalId),
    );
    return {
      external_id: user.externalId,
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
      avatar: user.avatar,
    };
  }

  @Get(':externalId/avatar')
  public async getAvatar(
    @Param('externalId') externalId: number,
  ): Promise<string> {
    return this.getAvatarByExternalIdUseCase.getAvatarByExternalId(
      new ExternalId(externalId),
    );
  }

  @Delete(':externalId/avatar')
  public async deleteAvatar(
    @Param('externalId') externalId: number,
  ): Promise<void> {
    await this.deletePhotoUseCase.delete(new ExternalId(externalId));
  }
}
