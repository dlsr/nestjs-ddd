import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserPort } from '../../../application/ports/out/create-user.port';
import { FindUserByExternalIdPort } from '../../../application/ports/out/find-user-by-external-id.port';
import Email from '../../../domain/email';
import ExternalId from '../../../domain/external-id';
import User from '../../../domain/user';
import UserId from '../../../domain/user-id';
import { UserDocument } from './user.schema';

export class UsersPersistenceAdapter
  implements CreateUserPort, FindUserByExternalIdPort
{
  public constructor(
    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  public async createUser(email: Email): Promise<User> {
    try {
      const user = new this.userModel({ email: email.value });
      await user.save();
      return new User(new Email(user.email), new UserId(user.id));
    } catch (error) {
      console.log(error);
      throw new Error(`Create User Error: ${error}`);
    }
  }

  public async findUserByExternalId(externalId: ExternalId): Promise<User> {
    const user = await this.userModel.findOne({
      externalId: externalId.id,
    });

    if (user) {
      return new User(
        new Email(user.email),
        new UserId(user.id),
        new ExternalId(user.externalId),
      );
    }
    return null;
  }
}
