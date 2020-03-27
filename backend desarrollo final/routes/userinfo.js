var express = require('express');
var userinfoController = require('../controllers/UserinfoController');

var api = express.Router();

api.post('/userinfo/logup', userinfoController.logup);
// api.post('/login', userController.login);

module.exports = api;