import Joi from "joi";

const userId = Joi.string()
  .required()
  .label("likes userId");
const codeSampleId = Joi.string()
  .required()
  .label("likes codeSampleId");

export const likes = Joi.object().keys({
  userId,
  codeSampleId
});
