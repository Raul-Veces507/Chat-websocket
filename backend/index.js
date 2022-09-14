const express = require("express");
const app = express();
const http = require('http').Server(app);
const bodyParser = require("body-parser");
const port = process.env.PORT || 4000;
// const host =  '127.0.0.1';

const host =  '192.168.88.144';
const socketIO = require('socket.io');
const { registromagento,pruebamysql,
   banner,sucursales,ultimaOrden,
   detalleorden,allorden, pruebaonfleeet, pruebaWebsocket,
  } = require('./utils/prueba');

// apis de pediweb
const {  registropediweb,seccionesrswe,obtenerusuarios,eliminarusuario,detalleUser,actuzaliarseccion}=require('./utils/apirest')

const cors = require("cors");

const {prueba, insertarordenexpress,pruebaarray}=require('./utils/express');

app.use(bodyParser.json()); 


app.use(bodyParser.urlencoded({ extended: true }));

//CONFIGURACION DEL COORS
app.use(cors({origin:true,credentials:true}))



// IO = esta es la comunicacion del backend
module.exports.io = socketIO(http);
require('./socket/socket');



app.post('/registromagento',registromagento)





app.get('/banner',banner)
app.get('/sucursales',sucursales)
app.post('/ultimaOrden',ultimaOrden)
app.post('/detalleorden',detalleorden)
app.post('/allorden',allorden)

//Apis express

app.get('/prueba',prueba)

app.post('/insertarordenexpress',insertarordenexpress)
app.post('/pruebaarray',pruebaarray)



/// rspediweb


app.post('/registropediweb',registropediweb)

app.get('/seccionesrswe',seccionesrswe)

app.get('/obtenerusuarios',obtenerusuarios)

app.post('/eliminarusuario',eliminarusuario)

app.post('/detalleUser',detalleUser)
app.patch('/actuzaliarseccion',actuzaliarseccion)

app.post('/pruebaonfleeet',pruebaonfleeet)



// ubicaicion


http.listen(port, host, () => {
    console.log(`Servidor corriendo en http://${host}:${port}`);
  });