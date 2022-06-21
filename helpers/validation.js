const Joi = require('joi');

const userObjectValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().min(4).email().required(),
    password: Joi.string().min(4).required(),
  });

  return schema.validate(body);
};

module.exports.userObjectValidation = userObjectValidation;
