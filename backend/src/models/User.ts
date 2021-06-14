import mongoose, { Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

interface IUser extends Document {
  name: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator, {
  message: "ce nom existe déjà",
});

export const User = mongoose.model<IUser>("User", userSchema);
