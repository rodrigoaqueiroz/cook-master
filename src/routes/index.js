const express = require('express');
const { userCreate } = require('../controllers/users.controllers');
const { toSignIn } = require('../controllers/login.controllers');
// const { registerRecipe } = require('../controllers/login.controllers');

const router = express.Router();

router.post('/users', userCreate);
router.post('/login', toSignIn);
// router.post('/recipe', registerRecipe);

module.exports = router;
