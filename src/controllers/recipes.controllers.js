const { createRecipes } = require('../services/recipes.service');

const codeCreated = 201;
const registerRecipe = async (req, res, next) => {
  const { user } = req;
  try {
    const { name, ingredients, preparation } = req.body;

    const newRecipe = await createRecipes(name, ingredients, preparation, user);
    // console.log(`SEGUE AQUI A NEWRECIPE: ${newRecipe}`);
    return res.status(codeCreated).json(newRecipe);
  } catch (error) { 
    console.log(`POST CREATERECIPE -> ${error.message}`);
    return next(error);
  }
};

module.exports = { 
  registerRecipe,
};
