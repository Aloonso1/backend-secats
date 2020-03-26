var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = Schema({
    title: String,
    description: String,
    image: String,
    price_buy: Number,
    price_sell: Number,
    stock: Number,
    listofproducts: String,
    moredetails: String,
    idCategory: {type:Schema.ObjectId, ref: 'category'},
    points: Number,
    notes: String
});

module.exports = mongoose.model('product',productSchema);