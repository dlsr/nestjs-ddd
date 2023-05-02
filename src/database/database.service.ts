import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

export class DatabaseService {
  public constructor(
    @InjectConnection() private readonly connection: Connection,
  ) {}

  getDbHandle(): Connection {
    return this.connection;
  }
}
