const { createUser } = require('../services/users.services');

const codeCreated = 201;
const userCreate = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = await createUser(name, email, password, role);
    return res.status(codeCreated).json(newUser);
  } catch (error) {
    console.log(`POST CREATEUSER -> ${error.message}`);
    return next(error);
  }
};

module.exports = { 
  userCreate,
};
