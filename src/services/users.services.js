const { create } = require('../models/users.models');
const { validateName, validateEmail, validatePassword } = require('../validations/validations');

const createUser = async (name, email, password, role) => {
  const verifyName = await validateName(name);
  const verifyEmail = await validateEmail(email);
  const verifyPassword = await validatePassword(password);
  const userId = await create(verifyName, verifyEmail, verifyPassword, role);
  const createdUser = { user: { ...userId, role } };
  return createdUser;  
};
  
module.exports = {
  createUser,
};
