// function reqValidator(req, res, next) {
//   console.log(req.body);
//   next();
// }
// module.exports = reqValidator;

const Joi = require("joi");

const reqValidator = (schema) => {
  return (req, res, next) => {
    console.log(schema.body.validate(req.body).error.message);
    next();
  };
};

module.exports = reqValidator;
