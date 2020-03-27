var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserInfoSchema = Schema({
    // image: String,
    name: String,
    dni: String,
    // birthday: String,
    // number: String,
    // sex: String,
    // idAdress: {type:Schema.ObjectId, ref: 'adress'}
    
});

module.exports = mongoose.model('userinfo',UserInfoSchema);