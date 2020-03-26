var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = Schema({
    dni: String,
    // email: String,
    points: Number,
    idUserInfo: {type:Schema.ObjectId, ref: 'userinfo'}
    
});

module.exports = mongoose.model('client',ClientSchema);