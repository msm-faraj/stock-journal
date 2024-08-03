const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().min(1).required(),
  password: Joi.number().min(1).required(),
  email: Joi.string().email().required(),
});

module.exports = registerSchema;
