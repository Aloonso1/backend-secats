var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');

function logup(req, res){
    var params = req.body;
    // console.log(params)
    var user = new User();

    if(params.password){
        bcrypt.hash(params.password,null, null,function(err,hash){
            if(hash){
                // console.log(params);
                user.name = params.name;
                user.password= hash;
                user.email = params.email;
                user.image = params.image;
                user.role = params.role;
                user.save((err, user_save)=>{
                    if(err){
                        res.status(500).send({error: 'No se registro el usuario'});
                    }else{
                        console.log(`Se registro un nuevo usuario ${user.name}`);
                        console.log(user_save);
                        res.status(200).send({user: user_save});
                    }
                });
                // console.log(user);
            }

        });
    }else{
        res.status(403).send({error: 'No ingreso la contraseña'});
    }

    // console.log(req);
    // console.log(params)
}

function login(req, res){
    var data = req.body;

    User.findOne({email: data.email},(err, user_data)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor' });
        }else{
            if (user_data) {
                bcrypt.compare(data.password,user_data.password, function(err, check){
                    if (check) {
                        if (data.gettoken) {
                            console.log(`Inicio sesion el usuario ${user_data.name} \n${user_data.email} ${check}`);
                            res.status(200).send({
                                jwt: jwt.createToken(user_data),
                                user: user_data,
                                
                            });                            
                        }else{
                            res.status(200).send({
                                user: user_data,
                                message: 'no token',
                                jwt: jwt.createToken(user_data)
                            });
                        }
                    }else{
                        res.status(403).send({message: `El correo o contraseña no coincide ${data.email}` });
                    }

                });
            }else{
                res.status(403).send({message: `No se encontro el usuario ${data.email}` });
            }
        }
    });
}

module.exports={
    logup,
    login
}




































//     for (let index = 0; index < 10000000; index++) {
//     var user = new User();
    
//     user.name = index+params.name;
//     user.password= index+params.password;
//     user.email = index+params.email;
//     user.image = index+params.image;
//     user.role = params.role;
//         console.log(index);
//     user.save((err, user_save)=>{
//         // if(err){
//         //     res.status(500).send({error: 'No se registro el usuario'});
//         // }else{
//         //     res.status(200).send({user: user_save});
//         // }
//     });
//     // if (index=100) {
//     //     res.status(500).send({error: 'Se registraron demasiados usuarios'});
//     // }
//     // if (index=100) {
//     //     user.save((err, user_save)=>{
//     //         if(err){
//     //             res.status(500).send({error: 'No se registro el usuario'});
//     //         }else{
//     //             res.status(200).send({user: user_save});
//     //         }
//     //     });
//     // }else{
     
//     // }
    
      
//   }