const { validateRecipe } = require('../validations/validations');
const { create, getRecipes, getById, editById } = require('../models/recipes.models');
const { msgNotFoundRecipe } = require('../utils/messages');
const { codeCreated, codeOK } = require('../utils/dictionary');

const createRecipes = async (name, ingredients, preparation, user) => {
  const verifyNull = await validateRecipe(name, ingredients, preparation, user);
  // console.log(user);
  const recipeId = await create(verifyNull, user);
  const createdRecipe = { recipe: { ...recipeId } };
  return { status: codeCreated, message: createdRecipe };
};

const getAllRecipes = async () => {
  const recipes = await getRecipes();
  return { status: codeOK, message: recipes };
};

const getRecipe = async (id) => {
  const recipe = await getById(id);
  if (!recipe) throw msgNotFoundRecipe;
  return { status: codeOK, message: recipe };
};

const editRecipeById = async (id, obj, user) => {
  const edited = await editById(id, obj, user);
  return { status: codeOK, message: edited };
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipe,
  editRecipeById,
};
