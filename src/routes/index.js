const express = require('express');
const { userCreate, adminCreate } = require('../controllers/users.controllers');
const { toSignIn } = require('../controllers/login.controllers');
const { registerRecipe, showRecipes, 
  showRecipe, showEdited, deleted, imageUpdated } = require('../controllers/recipes.controllers');
const { validateToken, validateAdmin } = require('../validations/validations');

const router = express.Router();
const RECIPES_ID = '/recipes/:id';

router.post('/users', userCreate);
router.post('/login', toSignIn);
router.post('/recipes', validateToken, registerRecipe);
router.post('/users/admin', validateToken, validateAdmin, adminCreate);

router.get('/recipes', showRecipes);
router.get('/recipes', validateToken, showRecipes);
router.get(RECIPES_ID, showRecipe);
router.get(RECIPES_ID, validateToken, showRecipe);

router.put(RECIPES_ID, validateToken, showEdited);
router.put('/recipes/:id/image', validateToken, imageUpdated);

router.delete(RECIPES_ID, validateToken, deleted);
router.delete(RECIPES_ID, deleted);

module.exports = router;
