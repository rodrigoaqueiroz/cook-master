const connect = require('./connection');

const create = async (name, ingredients, preparation, user) => {
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
