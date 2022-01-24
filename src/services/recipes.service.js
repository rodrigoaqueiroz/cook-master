const { validateRecipe } = require('../validations/validations');
const { create, getRecipes, getById } = require('../models/recipes.models');
const { msgNotFoundRecipe } = require('../utils/messages');

const createRecipes = async (name, ingredients, preparation, user) => {
  const verifyNull = await validateRecipe(name, ingredients, preparation, user);
  // console.log(user);
  const recipeId = await create(verifyNull, user);
  const createdRecipe = { recipe: { ...recipeId } };
  return { status: 201, message: createdRecipe };
};

const getAllRecipes = async () => {
  const recipes = await getRecipes();
  return { status: 200, message: recipes };
};

const getRecipe = async (id) => {
  const recipe = await getById(id);
  if (!recipe) throw msgNotFoundRecipe;
  return { status: 200, message: recipe };
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipe,
};
