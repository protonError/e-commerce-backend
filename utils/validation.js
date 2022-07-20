const Joi = require("joi");

// Validate  data on a new user registration
const validateOnRegister = (data) => {
  const schema = Joi.object({
    firstname: Joi.string().min(3).max(30).required(),
    lastname: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
    role: Joi.string().required(),
  });

  return schema.validate(data);
};

// validate on Login

const validateOnLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
  });

  return schema.validate(data);
};

module.exports = { validateOnRegister, validateOnLogin };
