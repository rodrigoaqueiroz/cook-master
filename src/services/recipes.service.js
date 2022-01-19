const { validateRecipe } = require('../validations/validations');
const { create } = require('../models/recipes.models');

const createRecipes = async (name, ingredients, preparation, user) => {
  const verifyNull = await validateRecipe(name, ingredients, preparation, user);
  const recipeId = await create(verifyNull, user);
  const createdRecipe = { recipe: { ...recipeId } };
  return createdRecipe;
};

module.exports = {
  createRecipes,
};
