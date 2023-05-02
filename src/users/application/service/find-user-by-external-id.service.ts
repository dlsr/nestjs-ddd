import { Inject } from '@nestjs/common';
import ExternalId from '../../domain/external-id';
import User from '../../domain/user';
import { FindUserByIdUseCase } from '../ports/in/find-user-by-external-id.usecase';
import {
  FindUserByExternalIdPort,
  FIND_USER_BY_EXTERNAL_ID_PORT,
} from '../ports/out/find-user-by-external-id.port';

export class FindUserByExternalIdService implements FindUserByIdUseCase {
  public constructor(
    @Inject(FIND_USER_BY_EXTERNAL_ID_PORT)
    private readonly findUserByExternalIdPort: FindUserByExternalIdPort,
  ) {}

  public async findUserByExternalId(externalId: ExternalId): Promise<User> {
    return this.findUserByExternalIdPort.findUserByExternalId(externalId);
  }
}
