const { signIn } = require('../services/login.service');

const toSignIn = async (req, res, next) => {
  const codeOK = 200;
  try {
    const { email, password } = req.body;
    const newLogin = await signIn(email, password);
    return res.status(codeOK).json(newLogin.message);
  } catch (error) {
    console.log(`POST signIn (LOGIN) -> ${error.message}`);
    return next(error);
  }
};

module.exports = { 
  toSignIn,
};
