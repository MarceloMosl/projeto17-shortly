import Joi from "joi";
export const urlPostSchema = Joi.object({
  url: Joi.string().required(),
});
