var express = require('express');
var ClientController = require('../controllers/ClientController');

var api = express.Router();

api.post('/Client/logup', ClientController.logup);
api.get('/Client/:id', ClientController.getClient);
api.put('/Client/edit/:id', ClientController.editClient);
api.delete('/Client/delete/:id', ClientController.deleteClient);
api.get('/Clients/:email?', ClientController.listClient);


module.exports = api;