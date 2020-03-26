var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SaleSchema = Schema({
    idClient: {type: Schema.ObjectId, ref: 'client'},
    idUser: {type: Schema.ObjectId, ref: 'user'},
    date: {type: Date, default: Date.now}
    
});

module.exports = mongoose.model('sale',SaleSchema);