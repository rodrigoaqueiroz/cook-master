const { validateLogin, validateNull } = require('../validations/validations');
const { genToken } = require('./authService');

const codeOK = 200;

const signIn = async (email, password) => {
  const verifyNull = await validateNull(email, password);
  const verifyLogin = await validateLogin(verifyNull);
  const token = await genToken(verifyLogin);
  return { status: codeOK, message: { token } };  
};

module.exports = {
  signIn,
};
