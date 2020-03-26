var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SaledetailsSchema = Schema({
    idProduct: {type: Schema.ObjectId, ref:'product'},
    quantity : Number
    
});

module.exports = mongoose.model('saledetails',SaledetailsSchema);