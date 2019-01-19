import Joi from "joi";

const title = Joi.string()
  .required()
  .label("Sample title");
const language = Joi.array()
  .items(Joi.string())
  .label("Sample language");
const framework = Joi.array()
  .items(Joi.string())
  .label("Sample framework");
const codeSample = Joi.string()
  .required()
  .label("Sample code");
const likes = Joi.number()
  .integer()
  .label("sample likes");
const dislikes = Joi.number()
  .integer()
  .label("sample dislikes");
const edited = Joi.boolean().label("Sample has been edited");
const date = Joi.date().label("Sample creation date");

export const postCodeSample = Joi.object().keys({
  title,
  codeSample,
  language,
  framework,
  likes,
  dislikes,
  edited,
  date
});

export const updateCodeSample = Joi.object().keys({
  title,
  codeSample,
  language,
  framework,
  edited
});
