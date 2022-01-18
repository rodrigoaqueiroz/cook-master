const Joi = require('joi');
const { 
  msgBadRequest, msgConflict, 
  msgUnauthorizedNull, msgUnauthorizedIncorrect,
  } = require('../utils/messages');
const { getEmail } = require('../models/users.models');

const schema = Joi.string().not().empty().required();
const emailSchema = Joi.string().not().empty().email()
.required();

const validateName = (name) => {
  const { error } = schema.validate(name);

  if (error) {
    console.log(`ERRO NA VALIDAÇÃO: ${error.message}`);
    throw msgBadRequest;
  }
  return name;
};

const validateEmail = async (email) => {
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

const validateLogin = async (email, password) => {
  const registredEmail = await getEmail(email);

  if (!registredEmail || registredEmail.password !== password) throw msgUnauthorizedIncorrect;

  return registredEmail;
};

const validateNull = async (email, password) => {
  const { error } = emailSchema.validate(email) && schema.validate(password);

  if (error) throw msgUnauthorizedNull;

  return { email, password };
};

module.exports = { 
  validateName,
  validateEmail,
  validatePassword,
  validateLogin,
  validateNull,
};
