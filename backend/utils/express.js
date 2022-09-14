const { response } = require('express');
const sql = require("../classes/db");
const res = require('express/lib/response');
const axios = require('axios');
const dateTime = require('node-datetime');
const orden = require('./../orden.json')
const prueba = async (req, res = response) => {
    sql.query(`select*from morden`, (err, resp) => {
        if (err) {
            res.json({
                ok: false,
                mensaje: err
            })
        }

        res.json({
            ok: true,
            resp
        })
    })
}


const pruebaarray = async (req, res = response) => {
    let ClienteN = req.body.ClienteN
    let Nombre = req.body.Nombre
    let Apellido = req.body.Apellido
    let Telefono = req.body.Telefono
    let Email = req.body.Email
    let Edad = req.body.Edad
    let Clase = req.body.Clase
    let Ciudad = req.body.Ciudad
    let Area = req.body.Area
    let Direccion = req.body.Direccion
    let Flete = req.body.Flete
    let TotalO = req.body.TotalO
    let TotalItem = req.body.TotalItem
    let TotalQty = req.body.TotalQty
    let Bodega = req.body.Bodega
    let Accion = req.body.Accion
    let Remplazo = req.body.Remplazo
    let Comentario = req.body.Comentario
    let metodop = req.body.metodop
    let cclast = req.body.cclast
    let cctype = req.body.cctype
    let authcode = req.body.authcode
    let comentrega = req.body.comentrega
    let metodoenvio = req.body.metodoenvio
    let tiendaretiro = req.body.tiendaretiro
    let flagmercado = req.body.flagmercado
    let latitud = req.body.latitud
    let longitud = req.body.longitud
    let idtask = req.body.idtask
    let trackingURL = req.body.trackingURL
    let estador = req.body.estador
    let dt = dateTime.create();
    let fecha = dt.format('Y-m-d H:M:S');
    let fechaentrega = dt.format('Y-m-d');


    //item de orden 

    let Entityid = req.body.Entityid
    let idorden = req.body.idorden
    let item = req.body.item
    let codigo = req.body.codigo
    let descripcion = req.body.descripcion
    let cantidad = req.body.cantidad
    let inv = req.body.inv
    let flag = req.body.flag
    let empaque = req.body.empaque
    let precio = req.body.precio
    let marca = req.body.marca


    sql.query(`SELECT Orden FROM morden WHERE Orden LIKE '%X%' order by Id  desc Limit 1`, (err, rows) => {
        if (err) {
            res.json({
                ok: false,
                mensaje: err
            })
        }
        if (rows.length) {
            rows.forEach(function (row) {
                var ini = row.Orden.substring(2, 10);
                const data = parseInt(ini)
                const suma = data + 1
                const strings = suma.toString()
                const prueba = strings.padStart(8, "0");
                const resultados = `X-${prueba}`



                sql.query(`INSERT INTO morden( Orden, FechaPedido, ClienteN,Nombre, Apellido, Telefono, Email, Edad, Clase, Ciudad,Area, Direccion, Flete, TotalO, TotalItem, TotalQty,Bodega, Accion, Remplazo, Comentario, metodop, cclast,cctype, authcode, fechad, comentrega, metodoenvio, tiendaretiro,flagmercado, latitud, longitud, idtask, trackingURL, estador) VALUES
                    ('${resultados}','${fecha}','${ClienteN}','${Nombre}','${Apellido}','${Telefono}','${Email}','${Edad}','${Clase}','${Ciudad}','${Area}','${Direccion}','${Flete}','${TotalO}','${TotalItem}','${TotalQty}','${Bodega}','${Accion}','${Remplazo}','${Comentario}','${metodop}','${cclast}','${cctype}','${authcode}','${fechaentrega}','${comentrega}','${metodoenvio}','${tiendaretiro}','${flagmercado}','${latitud}','${longitud}','${idtask}','${trackingURL}','${estador}')`, (err, resp) => {
                    if (err) {
                        res.json({
                            ok: false,
                            mensaje: err
                        })
                    } else {
                        sql.query(`INSERT INTO orden_cons (idorden, bodega,userid, fecha, estado, userpicking) VALUES  ('${resultados}', ${Bodega}, 25554, '${fecha}', '1','0')`, (err, resp) => {
                            if (err) {
                                res.json({
                                    ok: false,
                                    mensaje: err
                                })
                            } else {

                                sql.query(`INSERT INTO tmp_orden(Entityid, idorden, item, codigo,
                                 descripcion, cantidad, inv, flag, empaque, precio, marca
                                 ) VALUES
                                   ('','X-00000001','${item}','${codigo}','${descripcion}',
                                   '${cantidad}','${inv}','${flag}','${empaque}','${precio}',
                                   '${marca}')`, (err, resp) => {
                                    if (err) {
                                        res.json({
                                            ok: false,
                                            mensaje: err
                                        })
                                    } else {
                                        res.json({
                                            ok: true,
                                            mensaje: 'se registro todo'
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            });
        } else {
            sql.query(`INSERT INTO morden( Orden, FechaPedido, ClienteN,
                Nombre, Apellido, Telefono, Email, Edad, Clase, Ciudad,
                Area, Direccion, Flete, TotalO, TotalItem, TotalQty,
                Bodega, Accion, Remplazo, Comentario, metodop, cclast,
                cctype, authcode, fechad, comentrega, metodoenvio, tiendaretiro,
                flagmercado, latitud, longitud, idtask, trackingURL, estador) VALUES
                ('X-00000001','${fecha}','${ClienteN}',
             '${Nombre}','${Apellido}','${Telefono}','${Email}','${Edad}','${Clase}','${Ciudad}',
             '${Area}','${Direccion}','${Flete}','${TotalO}','${TotalItem}','${TotalQty}',
             '${Bodega}','${Accion}','${Remplazo}','${Comentario}','${metodop}','${cclast}',
             '${cctype}','${authcode}','${fechaentrega}','${comentrega}','${metodoenvio}','${tiendaretiro}',
             '${flagmercado}','${latitud}','${longitud}','${idtask}','${trackingURL}','${estador}')`, (err, resp) => {
                if (err) {
                    res.json({
                        ok: false,
                        mensaje: err
                    })
                } else {
                    sql.query(`INSERT INTO orden_cons (idorden, bodega,userid, fecha, estado, userpicking) VALUES  ('X-00000001', ${Bodega}, 25554, '${fecha}', '1','0')`, (err, resp) => {
                        if (err) {
                            res.json({
                                ok: false,
                                mensaje: err
                            })
                        } else {

                            sql.query(`INSERT INTO tmp_orden(Entityid, idorden, item, codigo,
                             descripcion, cantidad, inv, flag, empaque, precio, marca
                             ) VALUES
                               ('','X-00000001','${item}','${codigo}','${descripcion}',
                               '${cantidad}','${inv}','${flag}','${empaque}','${precio}',
                               '${marca}')`, (err, resp) => {
                                if (err) {
                                    res.json({
                                        ok: false,
                                        mensaje: err
                                    })
                                } else {
                                    res.json({
                                        ok: true,
                                        mensaje: 'se registro todo'
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }









    })
}
const insertarordenexpress = async (req, res = response) => {



    let sql1 = `INSERT INTO sales_order_item(order_id, sku, qty_ordered) values?`;

    let values = [];

    let data = req.body

    let orden = 'X-1'
    let id = 3000000000001

    let users = data[0]['productos']
    let user = data
    let bodega = data[0]['Bodega']



    let sentencia = `INSERT INTO morden( Id,Orden, FechaPedido, ClienteN,
    Nombre, Apellido, Telefono, Email, Edad, Clase, Ciudad,
    Area, Direccion, Flete, TotalO, TotalItem, TotalQty,
    Bodega, Accion, Remplazo, Comentario, metodop, cclast,
    cctype, authcode, fechad, comentrega, metodoenvio, tiendaretiro,
    flagmercado, latitud, longitud, idtask, trackingURL, estador) VALUES ? `

    sql.query(`SELECT Id,Orden FROM morden WHERE Orden LIKE 'X-%' order by Id  desc Limit 1`, (err, rows) => {
        if (err) {
            res.json({
                ok: false,
                mensaje: err
            })
        }
        if (rows.length) {
            rows.forEach(function (row) {
                var identy=row.Id
                var ini = row.Orden.slice(2)

                const sumaid=identy+1
     
                const data = parseInt(ini)
                const suma = data + 1
                const strings = suma.toString()
                
                const resultados = `X-${strings}`


                let dt = dateTime.create();
                let fecha = dt.format('Y-m-d H:M:S');
                for (let i = 0; i < user.length; i++) {
                    values.push([sumaid,resultados, fecha, user[i].ClienteN, user[i].Nombre, user[i].Apellido,
                        user[i].Telefono, user[i].Email, user[i].Edad, user[i].Clase, user[i].Ciudad,
                        user[i].Area, user[i].Direccion, user[i].Flete, user[i].TotalO, user[i].TotalItem,
                        user[i].TotalQty, user[i].Bodega, user[i].Accion, user[i].Remplazo, user[i].Comentario, user[i].metodop,
                        user[i].cclast,
                        user[i].cctype, user[i].authcode, fecha, user[i].comentrega, user[i].metodoenvio,
                        user[i].tiendaretiro, user[i].flagmercado, user[i].latitud, user[i].longitud, user[i].idtask, user[i].trackingURL,
                        user[i].estador
    
    
    
    
                    ])
                }
    
    
                sql.query(sentencia, [values], (err, resp) => {
                    if (err) {
                        res.json({
                            ok: false,
                            mensaje: err
                        })
                    } else {
    
                        sql.query(`INSERT INTO orden_cons (idorden, bodega,userid, fecha, estado, userpicking) VALUES  ('${resultados}', ${bodega}, 25554, '${fecha}', '1','0')`, (err, resp) => {
                            if (err) {
                                res.json({
                                    ok: false,
                                    mensaje: err
                                })
                            } else {
                                let valuess = []
                              
                                for (let i = 0; i < users.length; i++) {
                                    valuess.push([sumaid, users[i].sku, users[i].cantidad])
                                }
                          
                                sql.query(sql1, [valuess], (err, resp) => {
                                    if (err) {
                                        res.json({
                                            ok: false,
                                            mensaje: err
                                        })
                                    } else {
                                        axios.post(`http://192.168.77.117/onfleet/onfleet.php?idOrden='${resultados}'&action=asignar&bodega=${bodega}`
                                        )
                                        .then(response => {
                                            res.json({
                                                ok: true,
                                                mensaje: 'todo registrado'
                                            })
                                          })
                                    }
                                })
    
                            }
                        })
                    }
                })
            
            })
        } else {
            let dt = dateTime.create();
            let fecha = dt.format('Y-m-d H:M:S');
            let fechaentrega = dt.format('Y-m-d');
            for (let i = 0; i < user.length; i++) {
                values.push([id,orden, fechaentrega, user[i].ClienteN, user[i].Nombre, user[i].Apellido,
                    user[i].Telefono, user[i].Email, user[i].Edad, user[i].Clase, user[i].Ciudad,
                    user[i].Area, user[i].Direccion, user[i].Flete, user[i].TotalO, user[i].TotalItem,
                    user[i].TotalQty, user[i].Bodega, user[i].Accion, user[i].Remplazo, user[i].Comentario, user[i].metodop,
                    user[i].cclast,
                    user[i].cctype, user[i].authcode, fecha, user[i].comentrega, user[i].metodoenvio,
                    user[i].tiendaretiro, user[i].flagmercado, user[i].latitud, user[i].longitud, user[i].idtask, user[i].trackingURL,
                    user[i].estador




                ])
            }


           sql.query(sentencia, [values], (err, resp) => {
          
                if (err) {
                    res.json({
                        ok: false,
                        mensaje: err
                    })
                } else {

                    
                
               

                    sql.query(`INSERT INTO orden_cons (idorden, bodega,userid, fecha, estado, userpicking) VALUES  ('X-1', ${bodega}, 25554, '${fecha}', '1','0')`, (err, resp) => {
                        if (err) {
                            res.json({
                                ok: false,
                                mensaje: err
                            })
                        } else {
                            let valuess = []
                           for (let i = 0; i < users.length; i++) {
                            valuess.push([id, users[i].sku, users[i].cantidad])
                                }

                          sql.query(sql1, [valuess], (err, resp) => {
                      
                                if (err) {
                                    res.json({
                                        ok: false,
                                        mensaje: err
                                    })
                                } else {
                                    axios.post(`http://192.168.77.117/onfleet/onfleet.php?idOrden='${orden}'&action=asignar&bodega=${bodega}`
                                    )
                                    .then(response => {
                                        res.json({
                                            ok: true,
                                            mensaje: 'todo registrado'
                                        })
                                      })
                                }
                            })

                        }
                    })
                }
            })
        }









    })


}



module.exports = {
    prueba,
    insertarordenexpress,
    pruebaarray
}
