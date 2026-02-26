import mongoose, { Schema, Model } from 'mongoose';
import { IUser } from './types';

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: Schema.Types.String,
      default: null,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    image: {
      type: Schema.Types.String,
      default: null,
    },
    emailVerified: {
      type: Schema.Types.Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
