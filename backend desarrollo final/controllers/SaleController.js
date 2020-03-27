var Sale = require('../models/sale');
var SaleDetails = require('../models/saledetail');
var Product = require('../models/product');

function logup(req, res){
    let data = req.body;
    var sale = Sale();
    console.log(data);
    sale.idClient = data.idClient;
    sale.idUser = data.idUser;

    sale.save((errsalesave, sale_save)=>{
        if (sale_save) {

            let details = data.details;

            details.forEach((element, index) => {
                
                var saledetails = new SaleDetails();

                saledetails.idProduct = element.idProduct;
                saledetails.quantity = element.quantity;
                saledetails.sale = sale_save._id;

                saledetails.save((errsaledetailssave, details_save)=>{
                    if (details_save) {
                        Product.findById({_id: element.idProduct}, (errobtenerproducto, product_data)=>{
                           if (product_data) {
                               Product.findByIdAndUpdate(
                                   {_id: product_data._id}, 
                                   {stock: parseInt(product_data.stock) - parseInt(element.quantity)}, 
                                   (err, product_update)=>{
                                    res.end();
                               });
                           } else {
                               console.log(errobtenerproducto);
                            res.send('No se encontro el producto');
                           } 
                        });
                    } else {
                        res.send('No se pudieron registrar los datos');
                        console.log(errsaledetailssave);
                    }
                });
            });
        } else {
            res.send('No se pudieron registrar los datos');
            console.log(errsalesave);
        }
    });
}

function dataSale(req, res){
    let id = req.params['id'];
    Sale.findById(id, (err, data_sale)=>{
        if (data_sale) {
            SaleDetails.find({sale: id}, (err, data_saledetail)=>{
                console.log(data_saledetail);
                if (data_saledetail) {
                    res.status(200).send({
                        sale: data_sale,
                        details: data_saledetail
                    });
                        
                    
                } else {
                    console.log('error en los detalles');
                    res.send('error en los detalles');
                }

            })
        } else {
            console.log('error en la venta');
            res.send('error en la venta');
        }
    });
}

function editSale(req, res){

}

function deleteSale(req, res){

}

function listSale(req, res){

}

module.exports = {
    logup,
    dataSale,
    editSale,
    deleteSale,
    listSale
}