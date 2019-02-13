import Joi from "joi";

const language = Joi.string()
  .required()
  .label("name of language");
const codeSampleId = Joi.string().label("codesamples using this language");

export const addLanguage = Joi.object().keys({
  language,
  codeSampleId
});
