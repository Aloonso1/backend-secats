var Category = require('../models/category');


function logup(req, res){

    var data = req.body;
    var category = new Category();
    category.title = data.title;
    category.description = data.description;

    category.save((err, category_save)=>{
        if(err){
            res.status(500).send({message: `Error en el servidor`});
        }else{
            if (category_save) {
                console.log(`Se registro la categoria ${category.title}`); 
                res.status(200).send({
                    message: `Se registro la categoria ${category.title}`,
                    category: category_save});
            }else{
                res.status(403).send({message: `La categoria no se pudo registrar`});
            }
        }


    });
}

function getCategory(req, res){

    var id =req.params['id'];

    console.log(`Te solicitaron informacion de la categoria con id ${id}`);

    Category.findById({_id: id}, (err, category_data) =>{
        if(err){
            res.status(500).send({message: `Error en el servidor`});
        }else{
            if (category_data) {
                console.log(`Solicitaron la categoria ${category_data.title}`); 
                res.status(200).send({
                    message: `Obteniendo informacion de ${category_data.title}`,
                    category: category_data});
            } else {
                res.status(403).send({message: `No existe la categoria`});
            }
        }
    });
}

function editCategory(req, res){

    var id = req.params['id'];
    var data = req.body;

    console.log(`Van a editar la categoria con ${id}`);
    // Category.findOneAndUpdate();
    Category.findByIdAndUpdate({_id: id}, {title: data.title, description: data.description},(err, category_edit) =>{
        if(err){
            res.status(500).send({message: `Error en el servidor`});
        }else{
            if (category_edit) {
                console.log(`Actualizaron ${category_edit.title} por ${data.title}`); 
                res.status(200).send({
                    message: `Actualizaron ${category_edit.title} por ${data.title}`,
                    category: data});
                // res.status(200).send({category: data.title});
            } else {
                res.status(403).send({message: `La categoria no se pudo actualizar`});
            }
        }
    });
}

function deletecategory(req, res){

    var id = req.params['id'];

    Category.findByIdAndDelete({_id: id},(err, category_delete)=>{
        if (err) {
            res.status(500).send({message: `Error en el servidor`});
        } else {
            if (category_delete) {
                console.log(`Eliminaron la ${category_delete.title}`); 
                res.status(200).send({
                    message: `Eliminaron la ${category_delete.title}`,
                    category: category_delete});
            } else {
                res.status(403).send({message: `La categoria no se pudo eliminar`});
            }
        }

    });
    
}

function listCategory(req, res){

    var name = req.params['name'];

    Category.find({title: new RegExp(name, 'i')},(err, category_list)=>{
        if (err) {
            res.status(500).send({message: `Error en el servidor`});
        } else {
            if (category_list) {
                res.status(200).send({
                message: `Resultados de ${name}`,
                category: category_list});
                
            } else {
                res.status(403).send({message: `No se encontro ninguna categoria que coincidiera`});
            }
            
        }
    });


}



module.exports = {
    logup,
    getCategory,
    editCategory,
    deletecategory,
    listCategory,
    
   
};