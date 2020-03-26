var express = require('express');
var ProductController = require('../controllers/ProductController');
var multipart = require('connect-multiparty');
var path = multipart({uploadDir: './uploads/products'});

var api = express.Router();

// api.post();

api.post('/Product/logup', path, ProductController.logup);
api.get('/Products/:title?', ProductController.listProduct);
api.put('/Product/edit/:id', path, ProductController.editProduct);
api.put('/Product/edit/:id/:randum', path, ProductController.editProduct);
// api.put('/Product/edit/:id/:img', path, ProductController.editProduct);
api.get('/Product/:id', ProductController.getProduct);
api.delete('/Product/delete/:id', ProductController.deleteProduct);



module.exports = api;