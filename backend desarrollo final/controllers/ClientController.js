var Cliente = require('../models/client');

function logup(req, res){
    let data = req.body;
    var client = new Cliente();
    
    client.email = data.email;
    client.points = 10;
    client.idUserInfo = data.idUserInfo;

    client.save((err, client_save)=>{
        if (client_save) {
            res.status(200).send({client: client_save});
        } else {
            res.status(500).send(err);
        }
    });
    //MODELO
    // email: String,
    // points: Number,
    // idUserInfo: {type:Schema.ObjectId, ref: 'userinfo'},
    // createat: {type: Date, default: Date.now}
}

function getClient(req, res){

}

function editClient(req, res){

    let id = req.params['id'];
    // console.log(id);
    let data = req.body;
    // console.log(data.email + data.idUserInfo);

    Cliente.findByIdAndUpdate(id, {email: data.email, idUserInfo: data.idUserInfo}, (err, client_edit)=>{
        if (client_edit) {
            res.status(200).send({client: client_edit});
        } else {
            res.status(500).send(err);
        }
        
    });
}

function deleteClient(req, res){
    let id = req.params['id'];
    
    Cliente.findByIdAndRemove(id, (err, client_delete)=>{
        if (client_delete) {
            console.log(`Eliminaron la ${client_delete.email}`); 
            res.status(200).send({
                message: `Eliminaron la ${client_delete.email}`,
                category: client_delete});
        } else {
            res.status(500).send(err); 
        }
    });
}

function listClient(req, res){

    var email = req.params['email'];

    console.log(email);

    Cliente.find({email: new RegExp(email, 'i')},(err, client_list)=>{
        if (err) {
            res.status(500).send({message: `Error en el servidor`});
        } else {
            if (client_list) {
                res.status(200).send({
                message: `Resultados de ${email}`,
                category: client_list});
                
            } else {
                res.status(403).send({message: `No se encontro ningun cliente que coincidiera`});
            }
            
        }
    });
}

module.exports = {

    logup,
    getClient,
    editClient,
    deleteClient,
    listClient,    
   
};