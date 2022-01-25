const express = require('express');
const { userCreate } = require('../controllers/users.controllers');
const { toSignIn } = require('../controllers/login.controllers');
const { registerRecipe, showRecipes, 
  showRecipe, showEdited, deleted } = require('../controllers/recipes.controllers');
const { validateToken } = require('../validations/validations');

const router = express.Router();
const RECIPES_ID = '/recipes/:id';

router.post('/users', userCreate);
router.post('/login', toSignIn);
router.post('/recipes', validateToken, registerRecipe);

router.get('/recipes', showRecipes);
router.get('/recipes', validateToken, showRecipes);
router.get(RECIPES_ID, showRecipe);
router.get(RECIPES_ID, validateToken, showRecipe);

router.put(RECIPES_ID, validateToken, showEdited);

router.delete(RECIPES_ID, validateToken, deleted);
router.delete(RECIPES_ID, deleted);

module.exports = router;
