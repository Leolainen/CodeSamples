import mongoose from "mongoose";

/**
 * user object generally has a "createdAt" key.
 * the option "timestamps: true" in mongoose
 * will automatically add a 'createdAt' and 'updatedAt' key values
 * to the user object.
 */

const userSchema = new mongoose.Schema(
  {
    email: String,
    username: String,
    password: String,
    score: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

export default User;
