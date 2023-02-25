import Joi from "joi";
export const schemaUser = Joi.object({
  name: Joi.string().required().min(2),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
});
