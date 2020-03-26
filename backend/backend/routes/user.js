var express = require('express');
var userController = require('../controllers/UserController');

var api = express.Router();

api.post('/logup', userController.logup);
api.post('/login', userController.login);

module.exports = api;