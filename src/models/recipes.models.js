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

module.exports = {
  create,
};
