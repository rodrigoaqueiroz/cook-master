const { createUser } = require('../services/users.services');

const userCreate = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = await createUser(name, email, password, role);
    return res.send(200).json(newUser);
  } catch (error) {
    console.log(`POST CREATEUSER -> ${error.message}`);
    return next(error);
  }
};

module.exports = { 
  userCreate,
};
