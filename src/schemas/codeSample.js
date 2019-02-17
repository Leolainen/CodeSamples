import Joi from "joi";

const title = Joi.string()
  .required()
  .label("Sample title");
const codeSample = Joi.string()
  .required()
  .label("Sample code");
const frameworks = Joi.array()
  .items(Joi.string())
  .label("sample frameworks");
const languages = Joi.array()
  .items(Joi.string())
  .label("sample languages");
const likes = Joi.array()
  .items(Joi.string())
  .label("sample likes");
const edited = Joi.boolean().label("Sample has been edited");
const date = Joi.date().label("Sample creation date");

const framework = Joi.string().label("name of framework");

const language = Joi.string().label("name of language");

export const postCodeSample = Joi.object().keys({
  title,
  codeSample,
  likes,
  frameworks,
  languages,
  edited,
  date
});

export const addFramework = Joi.object().keys({
  framework
});

export const addLanguage = Joi.object().keys({
  language
});
