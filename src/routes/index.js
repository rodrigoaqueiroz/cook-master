const express = require('express');
const { userCreate } = require('../controllers/users.controllers');
const { toSignIn } = require('../controllers/login.controllers');
const { registerRecipe, showRecipes } = require('../controllers/recipes.controllers');
const { validateToken } = require('../validations/validations');

const router = express.Router();

router.post('/users', userCreate);
router.post('/login', toSignIn);
router.post('/recipes', validateToken, registerRecipe);
router.get('/recipes', showRecipes);
router.get('/recipes', validateToken, showRecipes);

module.exports = router;
