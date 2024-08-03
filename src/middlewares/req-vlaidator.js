const Joi = require("joi");

const validateRequest = (schema, property) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property]);

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    next();
  };
};

module.exports = validateRequest;
