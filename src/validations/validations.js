const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { 
  msgBadRequest, msgConflict, 
  msgUnauthorizedNull, msgUnauthorizedIncorrect, msgBadJWT,
  } = require('../utils/messages');
const { getEmail } = require('../models/users.models');
const { secret } = require('../services/authService');

const schema = Joi.string().not().empty().required();
const emailSchema = Joi.string().not().empty().email()
.required();
const recipesSchema = Joi.string().not().empty().required();

const validateName = (name) => {
  const { error } = schema.validate(name);

  if (error) throw msgBadRequest;
  
  return name;
};

const validateEmail = async (email) => {
  const { error } = emailSchema.validate(email);

  if (error) throw msgBadRequest;
  
  const duplicatedEmail = await getEmail(email);

  if (duplicatedEmail) throw msgConflict;

  return email;
};

const validatePassword = (password) => {
  const { error } = schema.validate(password);

  if (error) throw msgBadRequest;

  return password;
};

const validateLogin = async ({ email, password }) => {
  const registredEmail = await getEmail(email);

  if (!registredEmail || registredEmail.password !== password) throw msgUnauthorizedIncorrect;

  return registredEmail;
};

const validateNull = async (email, password) => {
  const nullSchema = Joi.object({ 
    email: emailSchema,
    password: schema,
  });
  const { error } = nullSchema.validate({ email, password });
  if (error) throw msgUnauthorizedNull;

  return { email, password };
};

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) res.status(401).json({ error: 'Token não encontrado.' });
  
  try {
    const decoded = jwt.verify(token, secret);
    // console.log(`SEGUE AQUI O DECODED: ${decoded.data.email}`);
    const user = await getEmail(decoded.data.email);
    console.log(user);
    
    if (!user) res.status(401).json({ error: 'Erro ao procurar usuário do token.' });
    req.user = user;
    
    next();
  } catch (err) {
    console.log(`TOKEN VALIDATION ERROR: ${err.message}`);
    return next({ status: 401, message: msgBadJWT.message });
  }
};

const validateRecipe = (name, ingredients, preparation) => {
  const schemaRecipes = Joi.object({  
    name: recipesSchema,
    ingredients: recipesSchema,
    preparation: recipesSchema,
  });

  const { error } = schemaRecipes.validate({ name, ingredients, preparation });
  
  if (error) {
    throw msgBadRequest;
  }
  return { name, ingredients, preparation };
};

module.exports = { 
  validateName,
  validateEmail,
  validatePassword,
  validateLogin,
  validateNull,
  validateToken,
  validateRecipe,
};