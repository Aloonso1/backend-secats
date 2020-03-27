var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'alonso';
// var user;
exports.createToken = function(user){
    var payload ={
        sub: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        image: user.image,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix(),
    }

    return jwt.encode(payload, secret);
}




