import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  otp?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  otpExpiresAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      default: null
    },
    otpExpiresAt: {
      type: Date,
    }
  },
  { timestamps: true }
);

const User = models.User || model<IUser>("User", userSchema);

export default User;
