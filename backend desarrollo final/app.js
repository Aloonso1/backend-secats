//REQUIRES

var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 4201;

//ROUTES
var user_routes = require('./routes/user');
var category_routes = require('./routes/category');
var product_routes = require('./routes/product');
var client_routes = require('./routes/client');
var userinfo_routes = require('./routes/userinfo');
var sale_routes = require('./routes/sale');

var app = express();

// CONEXION CON BASE Y MONTAR SERVIDOR

mongoose.connect('mongodb://localhost:27017/sistema',{ useUnifiedTopology: true, useNewUrlParser: true },(err,res)=>{
    if (err){
        throw err;
    }
    else{
        console.log("corriendo servidor");
        app.listen(port,() =>{

            console.log(`Servidor conectado con la bd corriendo en el puerto ${port}: online`);
            console.log('Node/Express: \x1b[36m%s\x1b[0m', 'online'); 
            console.log('Mongo: \x1b[36m%s\x1b[0m', 'online'); 

        });
    }

});

app.use(bodyparser.urlencoded({extended: true}));;
app.use(bodyparser.json());
app.use('/api', user_routes);
app.use('/api', category_routes);
app.use('/api', product_routes);
app.use('/api', client_routes);
app.use('/api', userinfo_routes);
app.use('/api', sale_routes);

module.exports = app;