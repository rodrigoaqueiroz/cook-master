const { signIn } = require('../services/login.service');

const toSignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const newLogin = await signIn(email, password);
    return res.status(201).json(newLogin.message);
  } catch (error) {
    console.log(`POST signIn (LOGIN) -> ${error.message}`);
    return next(error);
  }
};

module.exports = { 
  toSignIn,
};
