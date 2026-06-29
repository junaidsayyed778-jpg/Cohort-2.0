import { IUser } from "@/types/userTypes";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema<IUser>(
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

userSchema.pre("save", function (): void {
  if (!this.isModified("password")) return;
  this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.methods.comparePass = function (candidataPassword: string): boolean {
  return bcrypt.compareSync(candidataPassword, this.password);
};

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
