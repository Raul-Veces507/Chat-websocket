const crearMensaje = (nombre, metadata,id,status) => {
    return {
        nombre,
        metadata:[metadata],
        fecha: new Date().getTime(),
        status,
        id
    }
}

module.exports = {
    crearMensaje
}