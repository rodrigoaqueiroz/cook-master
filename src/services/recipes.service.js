const { validateRecipe } = require('../validations/validations');
const { create, getRecipes } = require('../models/recipes.models');

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

module.exports = {
  createRecipes,
  getAllRecipes,
};
