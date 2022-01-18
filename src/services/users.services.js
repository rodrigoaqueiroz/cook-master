const { create } = require('../models/users.models');
const { validateName, validateEmail, validatePassword } = require('../validations/validations');
// const userSchema = Joi.object({
//   name: Joi.string().not().empty().required(),
//   email: Joi.string().not().empty().email()
//   .required(),
//   password: Joi.string().not().empty().required(),
// });

// referência do schema do email, not e empty: https://joi.dev/api/?v=17.5.0
const createUser = async (name, email, password, role) => {
  const verifyName = await validateName(name);
  const verifyEmail = await validateEmail(email);
  const verifyPassword = await validatePassword(password);
  const userId = await create(verifyName, verifyEmail, verifyPassword, role);
  const createdObj = { user: { ...userId, role: 'user' } };
  return createdObj;  
};

module.exports = {
  createUser,
};
