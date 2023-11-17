import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserCreditDocument = HydratedDocument<UserCredit>;

@Schema({ timestamps: true, collection: 'user-credits' })
export class UserCredit {
  @Prop({ required: true, index: true, unique: true })
  userId: string;

  @Prop({ required: true, default: 0 })
  credit: number;
}

export const UserCreditSchema = SchemaFactory.createForClass(UserCredit);
