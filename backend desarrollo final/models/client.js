var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = Schema({
    
    email: String,
    points: Number,
    idUserInfo: {type:Schema.ObjectId, ref: 'userinfo'},
    createat: {type: Date, default: Date.now}
    
});

module.exports = mongoose.model('client',ClientSchema);