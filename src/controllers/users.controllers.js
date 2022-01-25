const { createUser } = require('../services/users.services');
const { codeCreated } = require('../utils/dictionary');

const userCreate = async (req, res, next) => {
  try {
    const { name, email, password, role = 'user' } = req.body;
    const newUser = await createUser(name, email, password, role);
    return res.status(codeCreated).json(newUser);
  } catch (error) {
    console.log(`POST CREATEUSER -> ${error.message}`);
    return next(error);
  }
};

const adminCreate = async (req, res) => {
  const { name, email, password, role = 'admin' } = req.body;
  const newAdmin = await createUser(name, email, password, role);
  return res.status(201).json(newAdmin);
};

module.exports = { 
  userCreate,
  adminCreate,
};
