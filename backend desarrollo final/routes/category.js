var express = require('express');
var CategoryController = require('../controllers/CategoryController');

var api = express.Router();



api.post('/category/logup', CategoryController.logup);
api.get('/category/:id', CategoryController.getCategory);
api.put('/category/edit/:id', CategoryController.editCategory);
api.delete('/category/delete/:id', CategoryController.deletecategory);
api.get('/categories/:name?', CategoryController.listCategory);


module.exports = api;