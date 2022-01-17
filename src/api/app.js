const express = require('express');
const router = require('../routes');

const app = express();
app.use(express.json());
app.use(router);
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', router);

module.exports = app;
