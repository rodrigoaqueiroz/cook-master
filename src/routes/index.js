const express = require('express');
const { userCreate } = require('../controllers/users.controllers');

const router = express.Router();

router.post('/users', userCreate);

module.exports = router;
