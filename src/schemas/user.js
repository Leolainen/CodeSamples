import Joi from "joi";

/**
 * the regex in password validation means:
 * Minimum eight characters, maximum 30 characters,
 * at least one letter and one number
 */
const email = Joi.string()
  .email()
  .required()
  .label("Email");
const username = Joi.string()
  .alphanum()
  .min(4)
  .max(30)
  .required()
  .label("Username");
const password = Joi.string()
  .min(8)
  .max(30)
  .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d].*$/)
  .label("Password")
  .options({
    language: {
      string: {
        regex: {
          base:
            "Password must be at least 8 characters long and have at least one letter and no special characters"
        }
      }
    }
  });
const score = Joi.number()
  .integer()
  .label("Score");

const likes = Joi.string().label("Likes");
const dislikes = Joi.string().label("Disikes");

const passwordForSignIn = Joi.string()
  .required()
  .label("password for signIn");

export const signUp = Joi.object().keys({
  email,
  username,
  password,
  score,
  likes,
  dislikes
});

export const signIn = Joi.object().keys({
  email,
  passwordForSignIn
});
