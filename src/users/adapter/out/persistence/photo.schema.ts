import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PhotoDocument extends Document {
  @Prop()
  userExternalId: number;

  @Prop()
  hash: string;

  constructor(photo?: Partial<PhotoDocument>) {
    super();
    this.userExternalId = photo.userExternalId;
    this.hash = photo.hash;
  }
}

export const PhotoSchema = SchemaFactory.createForClass(PhotoDocument);
