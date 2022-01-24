const { createRecipes, getAllRecipes, 
      getRecipe, editRecipeById } = require('../services/recipes.service');

// const codeCreated = 201;
const registerRecipe = async (req, res, next) => {
  const { user } = req;
  const { name, ingredients, preparation } = req.body;
  try {
    const newRecipe = await createRecipes(name, ingredients, preparation, user);
    // console.log(newRecipe.status, newRecipe.message);
    return res.status(newRecipe.status).json(newRecipe.message);
  } catch (error) { 
    console.log(`POST CREATERECIPE -> ${error.message}`);
    return next(error);
  }
};

const showRecipes = async (_req, res, next) => {
  try {
    const recipes = await getAllRecipes();
    return res.status(recipes.status).json(recipes.message);
  } catch (error) { 
    console.log(`GETRECIPES -> ${error.message}`);
    return next(error);
  }
};

const showRecipe = async (req, res, next) => {
  const { id } = req.params;
  try { 
    const recipe = await getRecipe(id);
    return res.status(recipe.status).json(recipe.message);
  } catch (error) {
    console.log(`GETRECIPESBYID -> ${error.message}`);
    return next(error);
  }
};

const showEdited = async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const valuesEdited = { name, ingredients, preparation };
  try {
    const recipe = await editRecipeById(id, valuesEdited, user);
    return res.status(recipe.status).json(recipe.message);
  } catch (error) {
    console.log(`EDITRECIPESBYID -> ${error.message}`);
    return next(error);
  }
};

module.exports = { 
  registerRecipe,
  showRecipes,
  showRecipe,
  showEdited,
};
