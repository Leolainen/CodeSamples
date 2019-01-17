import Joi from "joi";

/**
 * the regex in password validation means:
 * Minimum eight characters, maximum 30 characters,
 * at least one letter and one number
 */
export default Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .label("Email"),
  username: Joi.string()
    .alphanum()
    .min(4)
    .max(30)
    .required()
    .label("Username"),
  password: Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/)
    .label("Password")
    .options({
      language: {
        string: {
          regex: {
            base:
              "Password must be at least 8 characters long and have at least one letter and one character"
          }
        }
      }
    }),
  score: Joi.number()
    .integer()
    .label("Score")
});
