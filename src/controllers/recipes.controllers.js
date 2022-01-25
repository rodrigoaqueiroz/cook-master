const {
  createRecipes,
  getAllRecipes,
  getRecipe,
  editRecipeById,
  deleteRecipeById,
  putImage,
} = require('../services/recipes.service');
const upload = require('../middlewares/uploadImage');

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

const deleted = async (req, res, next) => {
  const { id } = req.params;
  try {
    const removedRecipe = await deleteRecipeById(id);
    return res.status(removedRecipe.status).json(removedRecipe.message);
  } catch (error) {
    console.log(`DELETERECIPES -> ${error.message}`);
    return next(error);
  }
};

// middleware upload.single('file') e controller do update da imagem

const imageUpdated = [
  upload.single('image'), 
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const updatedImage = await putImage(id);
      return res.status(updatedImage.status).json(updatedImage.message);
    } catch (error) {
      console.log(`UPLOADIMAGE -> ${error.message}`);
      return next(error);
    }
  },
];

module.exports = { 
  registerRecipe,
  showRecipes,
  showRecipe,
  showEdited,
  deleted,
  imageUpdated,
};
