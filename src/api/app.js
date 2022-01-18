const express = require('express');
const router = require('../routes');
const errorHandle = require('../middlewares/errorHandle');

const app = express();
app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', router);
app.post('/login', router);
app.use(errorHandle);
// app.use((err, _request, response, _next) => {
//   if (err.status) return response.status(err.status).json({ message: err.message });
//   return response.status(500).json({ message: err.message });
// });

module.exports = app;
