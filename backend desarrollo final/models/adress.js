var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdressSchema = Schema({
    street: String,
    colony: String,
    postalcode: Number,
    municipality: String,
    state: String,
    country: String
});

module.exports = mongoose.model('adress',AdressSchema);