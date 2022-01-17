const connect = require('./connection');

const create = async (name, email, password, role) => {
  const conn = await connect();
  const { insertedId } = conn.collection('users').insertOne({
    name, email, password, role: 'user',
  });

  return { id: insertedId, name, email, role };
};

module.exports = {
  create,
};
