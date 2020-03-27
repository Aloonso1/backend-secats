var Userinfo = require('../models/userinfo');

// ---------------------------------------------
// ---------------------------------------------
// Registro de la informacion del usuario
// ---------------------------------------------
// ---------------------------------------------

function logup(req, res){

    var data = req.body;
    var userinfo = new Userinfo();
    userinfo.name = data.name;
    userinfo.dni = data.dni;

    userinfo.save((err, userinfo_save)=>{
        if(err){
            res.status(500).send({message: `Error en el servidor`});
        }else{
            if (userinfo_save) {
                console.log(`Se registro la informacion de usuario ${userinfo.name}`); 
                res.status(200).send({
                    message: `Se registro la informacion de usuario ${userinfo.name}`,
                    category: userinfo_save});
            }else{
                res.status(403).send({message: `La informacion de usuario no se pudo registrar`});
            }
        }


    });
}

module.exports = {
    logup
}