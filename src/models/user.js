import mongoose from "mongoose";
import { hash, compare } from "bcryptjs";

/**
 * docs about schemas: https://mongoosejs.com/docs/api.html#schema_Schema
 * docs about custom validation: https://mongoosejs.com/docs/validation.html#custom-validators
 *
 * user object generally has a "createdAt" key.
 * the option "timestamps: true" in mongoose
 * will automatically add a 'createdAt' and 'updatedAt' key values
 * to the user object.
 */

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: email => User.doesntExist({ email }),
        message: ({ value }) => `The email ${value} is taken`
      }
    },
    username: {
      type: String,
      validate: {
        validator: username => User.doesntExist({ username }),
        message: ({ value }) => `The username ${value} is taken`
      }
    },
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
userSchema.pre("save", async function() {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }
});

userSchema.methods.matchesPassword = function(password) {
  // compares the password in the argument to the actual hashed password
  return compare(password, this.password);
};

userSchema.statics.doesntExist = async function(options) {
  return (await this.where(options).countDocuments()) === 0;
};

const User = mongoose.model("User", userSchema);

export default User;
