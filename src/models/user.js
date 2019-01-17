import mongoose from "mongoose";
import { hash } from "bcryptjs";

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

// Hash the password before a user is saved in the database
// needs to be a regular function so that "this" refers to the user being worked on
userSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    try {
      this.password = await hash(this.password, 10);
    } catch (err) {
      next(err);
    }
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
