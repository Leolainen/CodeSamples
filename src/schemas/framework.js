import Joi from "joi";

const framework = Joi.string()
  .required()
  .label("name of framework");
const codeSampleId = Joi.string().label("codesamples using this framework");

export const addFramework = Joi.object().keys({
  framework,
  codeSampleId
});
