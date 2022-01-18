const Joi = require('joi');
const { msgBadRequest, msgConflict } = require('../utils/messages');
const { getEmail } = require('../models/users.models');

const schema = Joi.string().not().empty().required();

const validateName = (name) => {
  const { error } = schema.validate(name);
  if (error) {
    console.log(`ERRO NA VALIDAÇÃO: ${error.message}`);
    throw msgBadRequest;
  }
  return name;
};

const validateEmail = async (email) => {
  const emailSchema = Joi.string().not().empty().email()
  .required();
  const { error } = emailSchema.validate(email);
  if (error) {
    console.log(`ERRO NA VALIDAÇÃO: ${error.message}`);
    throw msgBadRequest;
  }

  const duplicatedEmail = await getEmail(email);

  if (duplicatedEmail) throw msgConflict;

  return email;
};

const validatePassword = (password) => {
  const { error } = schema.validate(password);
  if (error) {
    console.log(`ERRO NA VALIDAÇÃO: ${error.message}`);
    throw msgBadRequest;
  }
  return password;
};

module.exports = { 
  validateName,
  validateEmail,
  validatePassword,
};
