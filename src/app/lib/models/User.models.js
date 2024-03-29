import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: [true, "Name is Required"]
    },
    email: {
      type: String,
      // required: true
    },
    password: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// Middleware
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

UserSchema.methods.ConfirmPassword = async function (String_password) {
  const isMatch = await bcrypt.compare(String_password, this.password);
  return isMatch;
};

UserSchema.methods.updatePassword = async function (String_password) {
  user.password = await bcrypt.hash(String_password, 10);
    return true;
};

export const UserModel =
  mongoose.models.User || mongoose.model("User", UserSchema);
