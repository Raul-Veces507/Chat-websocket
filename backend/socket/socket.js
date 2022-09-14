const { io } = require('../index');
const { crearMensaje } = require('../utils/utilidades');
var siofu = require("socketio-file-upload");
const { Usuarios } = require('../classes/usuarios');
const myMessages=[]

const usuarios = new Usuarios();
io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {
      
        if (!callback) return; // evitar que ocurra error si mensaje del cliente no se hizo con callback
        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala son necesario'
            });
        }
        client.join(data.sala);
    
            usuarios.agregarPersonas(client.id, data.nombre, data.sala,data.ipdc);
            callback(usuarios.getPersonasSala(data.sala));
        
      
    });





   
    client.on('send-message',function(data){
  
            let persona = usuarios.getPersona(data.ipdc);
            console.log(persona);
        let mensaje = crearMensaje(persona.nombre, data.metadata,persona.id,data.status);
          client.emit('text-event',mensaje)

          client.broadcast.to(persona.id).emit('text-event', mensaje);
        })
    




});