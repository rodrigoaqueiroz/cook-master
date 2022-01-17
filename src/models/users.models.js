const connect = require('./connection');

const create = async (name, email, password) => {
  const conn = await connect();
  const { insertedId } = conn.collection('users').insertOne({
    name, email, password, role: 'user',
  });

  return { id: insertedId, name, email };
};

module.exports = {
  create,
};
