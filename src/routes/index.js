const express = require('express');
const { userCreate } = require('../controllers/users.controllers');
const { toSignIn } = require('../controllers/login.controllers');

const router = express.Router();

router.post('/users', userCreate);
router.post('/login', toSignIn);

module.exports = router;
