const Joi = require('joi');
const { create } = require('../models/users.models');

const userSchema = Joi.object({
  name: Joi.string().not().empty().required(),
  email: Joi.string().not().empty().email()
  .required(),
  password: Joi.string().not().empty().required(),
});

// referência do schema do email, not e empty: https://joi.dev/api/?v=17.5.0
const createUser = async (name, email, password, role) => {
  const { error } = userSchema.validate({ name, email, password });
  if (error) console.log(`ERRO NA VALIDAÇÃO: ${error.message}`);

  const userId = await create(name, email, password, role);

  return { id: userId, name, email };
};

module.exports = {
  createUser,
};
