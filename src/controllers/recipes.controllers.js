const { createRecipes, getAllRecipes } = require('../services/recipes.service');

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

module.exports = { 
  registerRecipe,
  showRecipes,
};
