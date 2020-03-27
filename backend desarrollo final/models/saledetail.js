var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SaledetailSchema = Schema({
    idProduct: {type: Schema.ObjectId, ref:'product'},
    quantity : Number,
    sale: {type: Schema.ObjectId, ref: 'sale'}
   
});

module.exports = mongoose.model('saledetail', SaledetailSchema);