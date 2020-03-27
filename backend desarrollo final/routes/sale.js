var express = require('express');
var SaleController = require('../controllers/SaleController');

var api = express.Router();

api.post('/sale/logup', SaleController.logup);
api.get('/sale/data/:id', SaleController.dataSale);
api.put('/sale/edit/:id', SaleController.editSale);
api.delete('/sale/delete/:id', SaleController.deleteSale);
api.get('/sale/:name?', SaleController.listSale);


module.exports = api;