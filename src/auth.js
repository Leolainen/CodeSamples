import { AuthenticationError } from "apollo-server-express";
import { User } from "./models";
import { SESSION_NAME } from "./sessionConfig";

export const attemptSignIn = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AuthenticationError("Incorrect email");
  }

  if (!(await user.matchesPassword(password))) {
    throw new AuthenticationError("Incorrect password");
  }

  return user;
};

const signedIn = req => {
  if (req.session) {
    return req.session.userId;
  }
  return false;
};

export const checkSignedIn = req => {
  if (!signedIn(req)) {
    throw new AuthenticationError("You’re not signed in!");
  }
};
export const checkSignedOut = req => {
  if (signedIn(req)) {
    throw new AuthenticationError("You’re already signed in!");
  }
};

export const signOut = (req, res) =>
  new Promise((resolve, reject) => {
    req.session.destroy(err => {
      if (err) reject(err);
      res.clearCookie(SESSION_NAME);
      resolve(true);
    });
  });
