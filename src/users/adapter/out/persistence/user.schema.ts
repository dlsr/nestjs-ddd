import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserDocument extends Document {
  @Prop()
  email: string;

  @Prop()
  externalId: number;

  constructor(user?: Partial<UserDocument>) {
    super();
    this.email = user.email;
    this.externalId = user.externalId;
  }
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
