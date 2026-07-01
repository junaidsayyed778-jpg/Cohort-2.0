import { IUser } from "@/types/userTypes";
import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

interface UserDocument extends Omit<IUser, "_id">, Document{
    comparePass(candidatePassword: string): boolean
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Min 6 character required"],
    },
    mobile: {
      type: String,
      minLength: [10, "min 10 character required"],
      maxLength: [10, "min 10 character required"],
    },
  },
  { timestamps: true },
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.methods.comparePass = function (candidataPassword: string): boolean {
  return bcrypt.compareSync(candidataPassword, this.password);
};

const UserModel =
  mongoose.models.User ||
  mongoose.model<UserDocument>("User", userSchema);

export default UserModel;