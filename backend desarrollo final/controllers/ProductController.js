var Product = require('../models/product');
var fs = require('fs');
var path = require('path');
// ---------------------------------------------
// ---------------------------------------------
// Registro de producto
// ---------------------------------------------
// ---------------------------------------------

function logup(req, res){
    
    var data = req.body;
    // if (req.files!=null) {
    //     console.log(`Imagen subida en la ruta ${req.files.image.path}`);
    // } else {
    //     console.log(`No se registro ninguna imagen`);
    // }
    // console.log(req.files);
    if (req.files) {
        console.log(`Imagen subida en la ruta ${req.files.image.path}`);
        
        var imagen_path = req.files.image.path;
        var name = imagen_path.split('\\');
        var image_name = name[2];

        var product = new Product();
      
        product.title = data.title;
        product.description = data.description;
        product.image = image_name;
        product.price_buy = data.price_buy;
        product.price_sell = data.price_sell;
        product.stock = data.stock;
        product.listofproducts = data.listofproducts;
        product.moredetails = data.moredetails;
        product.idCategory = data.idCategory;
        product.points = data.points;
        product.notes = data.notes;

        product.save((err, product_save)=>{
            if (err) {
                res.status(500).send({message: `Error en el servidor`});
            } else {
                if (product_save) {
                    console.log(`Se registro el porducto ${product_save.title}`); 
                    res.status(200).send({
                        message: `Se registro el producto ${product_save.title}`,
                        product: product_save});
                    //           
                } else {
                    res.status(403).send({message: `El producto no se pudo registrar`});
                }
            }
        });
    } else {
        console.log(`No se subio ninguna imagen`);
        var product = new Product();
      
        product.title = data.title;
        product.description = data.description;
        product.image = null;
        product.price_buy = data.price_buy;
        product.price_sell = data.price_sell;
        product.stock = data.stock;
        product.listofproducts = data.listofproducts;
        product.moredetails = data.moredetails;
        product.idCategory = data.idCategory;
        product.points = data.points;
        product.notes = data.notes;

        product.save((err, product_save)=>{
            if (err) {
                res.status(500).send({message: `Error en el servidor`});
            } else {
                if (product_save) {
                    console.log(`Se registro el producto ${product_save.title}`); 
                    res.status(200).send({
                        message: `Se registro el producto ${product_save.title}`,
                        product: product_save});
                    //           
                } else {
                    res.status(403).send({message: `El producto no se pudo registrar`});
                }
            }
        });
    }
}

// ---------------------------------------------
// ---------------------------------------------
// Obtener producto
// ---------------------------------------------
// ---------------------------------------------

function getProduct(req, res){
    var id = req.params['id'];

    Product.findById({_id: id}, (err, product_data)=>{
        if (err) {
            res.status(500).send({message: `Error en el servidor`});
        } else {
            if (product_data) {
                console.log(`Obteniendo informacion del producto ${product_data.title}`); 
                res.status(200).send({
                    message: `Obteniendo informacion de ${product_data.title}`,
                    category: product_data});
            } else {
                res.status(403).send({message: `No existe el producto`});
            }
        }
    });
}

// ---------------------------------------------
// ---------------------------------------------
// Enlistar producto
// ---------------------------------------------
// ---------------------------------------------

function listProduct(req, res){
    var title = req.params['title'];

    Product.find({title: new RegExp(title,'i')}).populate('idCategory').exec((err, product_list)=>{
        if (err) {
            res.status(500).send({message: `Error en el servidor`});
        } else {
              if (product_list) {
                console.log(`Obteniendo resultados de ${title}`); 
                res.status(200).send({
                message: `Resultados de ${title}`,
                products: product_list});
                
            } else {
                res.status(403).send({message: `No se encontro ningun producto que coincidiera`});
            }
        }
    });

}

// ---------------------------------------------
// ---------------------------------------------
// Editar Producto
// ---------------------------------------------
// ---------------------------------------------

function editProduct(req, res){

    var id = req.params['id'];
    var data = req.body;
    var img = req.params['img'];
    if (req.files) {
        
        var pathuploads = './uploads/products/'+img;
        // console.log(req.files);
        // console.log(path);
        var image_path = req.files.image.path;
        var name = image_path.split('\\');
        var image_name = name[2];

        fs.unlink(pathuploads, (err)=>{
            if(err) throw err;
        });


        Product.findByIdAndUpdate(
                {_id: id},
                {
                    title: data.title,
                    description: data.description,
                    image: image_name,    
                    price_buy: data.price_buy,
                    price_sell: data.price_sell,
                    stock: data.stock,
                    listofproducts: data.listofproducts,
                    moredetails: data.moredetails,
                    idCategory: data.idCategory,
                    points: data.points,
                    notes: data.notes
                },
                (err, product_edit)=>{
                    if (err) {
                        res.status(500).send({message: `Error en el servidor`});
                    } else {
                        if (product_edit) {
                            console.log(`Actualizaron ${product_edit.title} por ${data.title} se actualizo la imagen`); 
                            res.status(200).send({
                                message: `Actualizaron ${product_edit.title} por ${data.title}`,
                                product: product_edit});                        
                        } else {
                            console.log(`El producto no se actualizo`);
                            res.status(403).send({message: `El producto no se actualizo`});
                        }
                    }
                }
            );
    } else {
        Product.findByIdAndUpdate(
            {_id: id},
            {
                title: data.title,
                description: data.description,
                price_buy: data.price_buy,
                price_sell: data.price_sell,
                stock: data.stock,
                listofproducts: data.listofproducts,
                moredetails: data.moredetails,
                idCategory: data.idCategory,
                points: data.points,
                notes: data.notes
            },
            (err, product_edit)=>{
                if (err) {
                    res.status(500).send({message: `Error en el servidor`});
                } else {
                    if (product_edit) {
                        console.log(`Actualizaron ${product_edit.title} por ${data.title}`); 
                        res.status(200).send({
                            message: `Actualizaron ${product_edit.title} por ${data.title}`,
                            product: product_edit});                        
                    } else {
                        console.log(`El producto no se actualizo`);
                        res.status(403).send({message: `El producto no se actualizo`});
                    }
                }
            }
        );
    }

}

// ---------------------------------------------
// ---------------------------------------------
// Borrar producto
// ---------------------------------------------
// ---------------------------------------------

function deleteProduct(req, res){

    var id = req.params['id'];

    Product.findByIdAndDelete({_id: id},(err, product_delete)=>{
        if (err) {
            res.status(500).send({message: `Error en el servidor`});            
        } else {
            if (product_delete) {
                var pathuploads = './uploads/products/'+product_delete.image;
                fs.unlink(pathuploads, (err)=>{
                    if(err) throw err;
                });        
                console.log(`Se elimino ${product_delete.title}`); 
                res.status(200).send({
                    message: `Se elimino ${product_delete.title}`,
                    product: product_delete});  
            } else {
                console.log(`El producto no se elimino`);
                res.status(403).send({message: `El producto no se elimino`});
            }
        }

    });

}

// ---------------------------------------------
// ---------------------------------------------
// Actualizar stock
// ---------------------------------------------
// ---------------------------------------------

function updatestock(req, res){
    // console.log(`No se subio ninguna imagen`);
    // res.status(200).send({message: `Error en el servidor`});
    let id= req.params['id'];
    let data = req.body;

    Product.findById(id, (err, Product_data)=>{
        if (err) {
            res.status(500).send({message: `No se encontre servidor`});
        } else {
            if (Product_data) {

                Product.findByIdAndUpdate(
                    {_id: id},
                    {
                        stock: parseInt(Product_data.stock) + parseInt(data.stock), 
                    },
                    (err, product_edit)=>{
                        if (err) {
                            res.status(500).send({message: `Error en el servidor`});
                        } else {
                            if (product_edit) {
                                console.log(`Se le sumo ${data.stock} a${product_edit.stock}  en ${product_edit.title} `); 
                                res.status(200).send({
                                    message: `Se le sumo ${data.stock} a ${product_edit.stock}  en ${product_edit.title} `,
                                    product: product_edit});                        
                            } else {
                                console.log(`El producto no se actualizo`);
                                res.status(403).send({message: `El producto no se actualizo`});
                            }
                        }
                    }
                );

            } else {
                console.log(`Al producto no se actualizo su stock`);
                res.status(403).send({message: `Al producto no se actualizo su stock`});
            }
    }
    });
}

function getimg(req, res){
    let img = req.params['img'];
    console.log(img);

    if(img != "null"){
        let path_img = './uploads/products/' + img;
        res.status(200).sendFile(path.resolve(path_img));
    }else{
        let path_img = './uploads/products/defaultproduct.jpg';
        res.status(200).sendFile(path.resolve(path_img));
    }
}

module.exports = {
    logup,
    getProduct,
    listProduct,
    editProduct,
    deleteProduct,
    updatestock,
    getimg


}
// function logup(req, res){

//     var data = req.body;
//     var category = new Category();
//     category.title = data.title;
//     category.description = data.description;

//     category.save((err, category_save)=>{
//         if(err){
//             res.status(500).send({message: `Error en el servidor`});
//         }else{
//             if (category_save) {
//                 console.log(`Se registro la categoria ${category.title}`); 
//                 res.status(200).send({
//                     message: `Se registro la categoria ${category.title}`,
//                     category: category_save});
//             }else{
//                 res.status(403).send({message: `La categoria no se pudo registrar`});
//             }
//         }


//     });
// }

// function getCategory(req, res){
//     var id =req.params['id'];
//     console.log(`Te solicitaron informacion de la categoria con id ${id}`);
//     Category.findById({_id: id}, (err, category_data) =>{
//         if(err){
//             res.status(500).send({message: `Error en el servidor`});
//         }else{
//             if (category_data) {
//                 console.log(`Solicitaron la categoria ${category_data.title}`); 
//                 res.status(200).send({
//                     message: `Obteniendo informacion de ${category_data.title}`,
//                     category: category_data});
//             } else {
//                 res.status(403).send({message: `No existe la categoria`});
//             }
//         }
//     });
// }

// function editCategory(req, res){
//     var id = req.params['id'];
//     var data = req.body;
//     console.log(`Van a editar la categoria con ${id}`);
//     // Category.findOneAndUpdate();
//     Category.findByIdAndUpdate({_id: id}, {title: data.title, description: data.description},(err, category_edit) =>{
//         if(err){
//             res.status(500).send({message: `Error en el servidor`});
//         }else{
//             if (category_edit) {
//                 console.log(`Actualizaron ${category_edit.title} por ${data.title}`); 
//                 res.status(200).send({
//                     message: `Actualizaron ${category_edit.title} por ${data.title}`,
//                     category: data});
//                 // res.status(200).send({category: data.title});
//             } else {
//                 res.status(403).send({message: `La categoria no se pudo actualizar`});
//             }
//         }
//     });
// }

// function deletecategory(req, res){
//     var id = req.params['id'];
//     Category.findByIdAndDelete({_id: id},(err, category_delete)=>{
//         if (err) {
//             res.status(500).send({message: `Error en el servidor`});
//         } else {
//             if (category_delete) {
//                 console.log(`Eliminaron la ${category_delete.title}`); 
//                 res.status(200).send({
//                     message: `Eliminaron la ${category_delete.title}`,
//                     category: category_delete});
//             } else {
//                 res.status(403).send({message: `La categoria no se pudo eliminar`});
//             }
//         }
//     });
// }

// function listCategory(req, res){
//     var name = req.params['name'];
//     Category.find({title: new RegExp(name, 'i')},(err, category_list)=>{
//         if (err) {
//             res.status(500).send({message: `Error en el servidor`});
//         } else {
//             if (category_list) {
//                 res.status(200).send({
//                 message: `Resultados de ${name}`,
//                 category: category_list});
//             } else {
//                 res.status(403).send({message: `No se encontro ninguna categoria que coincidiera`});
//             }
//         }
//     });

// }

// module.exports = {
//     logup,
//     getCategory,
//     editCategory,
//     deletecategory,
//     listCategory,
// };