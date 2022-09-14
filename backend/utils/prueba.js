const { response } = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const sql = require("../classes/db");
const res = require('express/lib/response');
const { off } = require('process');

const registromagento=async(req,res=response)=>{
    let lastname  = req.body.lastname ; 
    let firstname = req.body.firstname ; 
    let email     = req.body.email ; 
    let dob       = req.body.dob ; 
    let gender    = req.body.gender ; 
    let password  = req.body.password ; 
  
    const urlKey = 'https://www.ribasmith.com/rest/V1/customers';
    const body =  {
      "customer" : {
        "lastname"  : `${lastname}`,
        "firstname" : `${firstname}`,
        "email"     : `${email}`,
        "dob"       : `${dob}`,
        "gender"    : `${gender}`,
     },
     "password"     : `${password}`
    };


    axios.post('https://www.ribasmith.com/rest/V1/customers',
    body
    )
    .then(response => {
       console.log(response);
      })
}


const pruebamysql=async(req,res=response)=>{
  sql.query(`SELECT * FROM gps_cliente `,(err,resp)=>{
    if(err){
      res.json({
        ok:false,
        mensaje:err
      })
    }else{
      res.json({
        ok:true,
        resp
      })
    }
  })
}

//api para obtener los banner de la aplicacion de cliente 

const banner=async(req,res=response)=>{

  sql.query(`SELECT * FROM gestorbanner WHERE estado=1`,(err,resp)=>{
    if(err){
      res.json({
        ok:false,
        mensaje:err
      })
    }else{
      res.json({
    
        resp
      })
    }
  })
}


//api para obtener las sucursales de la aplicacion de clinte
const sucursales=async(req,res=response)=>{
  sql.query(`SELECT * FROM sucursales `,(err,resp)=>{
    if(err){
      res.json({
        ok:false,
        mensaje:err
      })
    }else{
      res.json({
    
        resp
      })
    }
  })
}


//api para trear ultima orden del cliente 


const ultimaOrden=async(req,res=response)=>{
  let usuario=req.body.usuario
  sql.query(`SELECT mor.id as entityid, mot.idusermoto as
             idchofer, mor.orden , mor.fechapedido, mor.fechad,
              mor.accion as estadomorden, mor.estador as estadoReal,
               a.estado as estadopicking, mot.estado as estadochofer,
               mor.TotalO, mor.idtask, mor.trackingurl FROM morden mor
                LEFT join orden_cons a on a.idorden = orden
                 left JOIN orden_consmoto mot on mot.idorden = a.idorden
                  where Clienten=${usuario} order by entityid desc limit 1`,(err,resp)=>{
                    if(err){
                      res.json({
                        ok:false,
                        mensaje:err
                      })
                    }else{
                      res.json({
                    
                        resp
                      })
                    }
                  })
}


//api para traer toda las ordenes del cliente

const detalleorden=async(req,res)=>{

  let entityid=req.body.entityid;

  sql.query( `SELECT pi.Entityid,  pi.orden as noorden, pi.item, concat(pi.item, ".jpg") as imgurl, 
              pi.sku as sku, pi.descripcion, pi.marca, pi.qty as cantidad , pi.flag 
              from pickingitems pi WHERE entityid=${entityid} UNION ALL SELECT tmp.Entityid,
               tmp.entityid as noorden, tmp.item, concat(tmp.item, ".jpg") as imgurl,
                tmp.codigo as sku, tmp.descripcion, tmp.marca,  tmp.cantidad as cantidad ,
                 tmp.flag from tmp_orden tmp where entityid=${entityid}
                   and item not in (select item from pickingitems WHERE entityid=${entityid})`,(err,resp)=>{
                    if(err){
                      res.json({
                        ok:false,
                        mensaje:err
                      })
                    }else{
                      res.json({
                    
                        resp
                      })
                    }
                   });
  
}

const allorden=async(req,res=response)=>{
  let fecha=req.body.fecha
  let id=req.body.id


  sql.query(`SELECT mor.id as entityid, mot.idusermoto as idchofer, mor.orden ,
             mor.fechapedido, mor.fechad, mor.accion as estadomorden,
             mor.estador as estadoReal, a.estado as estadopicking, 
             mot.estado as estadochofer,mor.TotalO, mor.idtask, 
             mor.trackingurl FROM morden mor LEFT join orden_cons a on a.idorden = orden
              left JOIN orden_consmoto mot on mot.idorden = a.idorden where Clienten=${id} and
               YEAR(mor.fechaPedido) = ${fecha} ORDER by mor.orden DESC`,(err,resp)=>{
                if(err){
                  res.json({
                    ok:false,
                    mensaje:err
                  })
                }else{
                  res.json({
                
                    resp
                  })
                }
              
               })
}





const pruebaonfleeet=async(req,res=response)=>{
let orden='x-1'
let bodega=114100930

  axios.post(`http://192.168.77.117/onfleet/prueba.php?idOrden='${orden}'&action=asignar&bodega=${bodega}`
  )
  .then(response => {
     console.log(response);
    })
}







module.exports =
{

registromagento,
pruebamysql,
banner,
sucursales,
ultimaOrden,
detalleorden,
allorden,
pruebaonfleeet,

}