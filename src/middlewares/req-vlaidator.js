const Joi = require("joi");

const validateRequest = (schema, property) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property]);
    // console.log("req.body", req.body);
    // console.log("req.params", req.params);
    // console.log("req.query", req.query);

    if (error) {
      return res.status(400).json({ error: error });
    }
    console.log(value);
    next();
  };
};

module.exports = validateRequest;
