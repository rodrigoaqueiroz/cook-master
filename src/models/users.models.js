const connect = require('./connection');

const create = async (name, email, password, role) => {
  const conn = await connect();
  const newUserr = conn.collection('users').insertOne({
    name, email, password, role,
  }).then((res) => ({ _id: res.insertedId, name, email, role }));

  return newUserr;
};

const getEmail = async (email) => {
  const conn = await connect();
  const getEmailRecord = await conn.collection('users').findOne({ email });
  if (!getEmailRecord) return null;
  return getEmailRecord;
};

module.exports = {
  create,
  getEmail,
};
