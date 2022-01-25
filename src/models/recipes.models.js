const { ObjectId } = require('mongodb');
const connect = require('./connection');

const create = async (obj, user) => {
  const { name, ingredients, preparation } = obj;
  const conn = await connect();
  const { _id: userId } = user;
  const newRecipe = conn.collection('recipes').insertOne({
    name, ingredients, preparation, userId,
  }).then((res) => ({ 
    _id: res.insertedId, name, ingredients, preparation, userId,
  }));
  return newRecipe; 
};

const getRecipes = async () => {
  const conn = await connect();
  const getRecipesRecord = conn.collection('recipes').find().toArray();
  return getRecipesRecord;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const conn = await connect();
  const getRecipe = await conn.collection('recipes').findOne({ _id: ObjectId(id) });
  return getRecipe;
};

const editById = async (id, obj, user) => {
  if (!ObjectId.isValid(id)) return null;
  const { name, ingredients, preparation } = obj;
  const { _id: userId } = user;
  const conn = await connect();
  const findAndUpdate = await conn.collection('recipes').findOneAndUpdate( 
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
    ).then(() => ({ 
      _id: id, name, ingredients, preparation, userId,
    }));
    return findAndUpdate;
};

const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const conn = await connect();
  const getRecipe = await getById(id);
  if (!getRecipe) return null;
  const deleteOneRecipe = await conn.collection('recipes').deleteOne({ _id: id });
  return deleteOneRecipe;
};

const uploadImage = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const path = `localhost:3000/src/uploads/${id}.jpeg`;
  const conn = await connect();
  const getRecipe = await conn.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { image: path } },
    { returnOriginal: false },
  );
  console.log(`SEGUE AQUI O GETRECIPES IMAGE!!!!: ${getRecipe.value.image}`);
  console.log(getRecipe.value);

  return getRecipe.value;
};

// referência: https://stackoverflow.com/questions/35626040/how-to-get-updated-document-back-from-the-findoneandupdate-method

module.exports = {
  create,
  getRecipes,
  getById,
  editById,
  deleteRecipe,
  uploadImage,
};
