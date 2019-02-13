import Joi from "joi";

const userId = Joi.string()
  .required()
  .label("id of user commenting");
const username = Joi.string().label("username of comment");
const comment = Joi.string()
  .required()
  .label("comment content");
const codeSampleId = Joi.string()
  .required()
  .label("The codesample being commented on");
const likes = Joi.array()
  .items(Joi.string())
  .label("comment likes");
const edited = Joi.boolean().label("Comment has been edited");
const date = Joi.date().label("Comment creation date");

export const postComment = Joi.object().keys({
  userId,
  username,
  comment,
  codeSampleId,
  likes,
  edited,
  date
});
