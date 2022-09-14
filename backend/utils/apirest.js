
const { response } = require('express');

const sql = require("../classes/db");





const registropediweb=async(req,res=response)=>{
    let nombre =req.body.nombre
    let apellido=req.body.apellido
    let bodega=req.body.bodega
    let numeroEmpleado =req.body.numeroEmpleado
    let usuario=req.body.usuario
    let contraseña =req.body.contraseña
    let nivel=req.body.nivel
    let iddarwing =req.body.iddarwing
    let email=req.body.email
    let seccion=req.body.seccion
  
    let prueba=req.body
  
  
    console.log(numeroEmpleado);
  
    let  pruebas=prueba['prueba']
    sql.query(`INSERT INTO userweb(empresa, bodega, userid, users, pwd, nivel, nombre,
       apellido, seccion, idarwin, mail) VALUES ('11','${bodega}','${numeroEmpleado}','${usuario}',
       '${contraseña}','${nivel}','${nombre}','${apellido}','${seccion}','${iddarwing}','${email}')`,(err,resp)=>{
         if(err){
           res.json({
             ok:false,
             mensaje:err
           })
         }else{
       
  let sql1=`INSERT INTO seccionuser(idseccion, iduser, bodega) values?`
          let valuess = []
          for (let i = 0; i < pruebas.length; i++) {
              valuess.push([pruebas[i].idseccion,numeroEmpleado,bodega])
          }
  
          
  
       
         const prueba= sql.query(sql1, [valuess], (err, resp) => {
          console.log(prueba);
            if (err) {
                res.json({
                    ok: false,
                    mensaje: err
                })
            } else {
                res.json({
                    ok: true,
                    mensaje: 'todo registrado'
                })
            }
        })
         }
       })
  }
  
  
  
  
  
  
  const seccionesrswe=async(req,res=response)=>{
    sql.query(`SELECT * FROM iseccion`,(err,resp)=>{
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
  
  
  const obtenerusuarios =async(req,res=response)=>{
    sql.query(`SELECT * FROM userweb`,(err,resp)=>{
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
  
  
  
  const eliminarusuario=async(req,res=response)=>{
    let id= req.body.id;
    sql.query(`DELETE FROM userweb WHERE userid=${id}`,(err,resp)=>{
      if(err){
        res.json({
          ok:false,
          mensaje:err
        })
      }else{
        sql.query(`DELETE FROM seccionuser WHERE iduser=${id}`,(err,resp)=>{
          if(err){
            res.json({
              ok:false,
              mensaje:err
            })
          }else{
            res.json({
              ok:true,
              mensaje:'eliminado con exito'
            })
          }
        })
      }
    })
  }
  
  
  const detalleUser=async(req,res=response)=>{
    let id= req.body.id;
    sql.query(`SELECT * FROM userweb WHERE userid=${id}`,(err,usuario)=>{
      if(err){
        res.json({
          ok:false,
          mensaje:err
        })
      }else{
  
        sql.query(`SELECT i.idseccion,i.nomseccion FROM seccionuser s 
        LEFT JOIN  iseccion i on i.idseccion=s.idseccion 
        WHERE s.iduser=${id}`,(err,resp)=>{
          if(err){
            res.json({
              ok:false,
              mensaje:err
            })
          }else{
            
            res.json({
              ok:true,
              resp,
              usuario
            })
          }
        })
      }
    })
  }
  
  
  const actuzaliarseccion= async(req,res=response)=>{
    let nombre =req.body.nombre
    let apellido=req.body.apellido
    let bodega=req.body.bodega
    let numeroEmpleado =req.body.numeroEmpleado
    let usuario=req.body.usuario
    let contraseña =req.body.contraseña
    let nivel=req.body.nivel
    let iddarwing =req.body.iddarwing
    let email=req.body.email
    let prueba=req.body
    let  pruebas=prueba['prueba']
    sql.query(`UPDATE userweb SET empresa='11',bodega='${bodega}',users='${usuario}',pwd='${contraseña}',nivel='${nivel}',nombre='${nombre}',apellido='${apellido}',idarwin='${iddarwing}',mail='${email}' WHERE  userid='${numeroEmpleado}'`,(err,resp)=>{
      if(err){
        res.json({
          ok:false,
          mensaje:err
        })
      }else{
       sql.query(`DELETE FROM seccionuser WHERE iduser=${numeroEmpleado}`,(err,resp)=>{
         if(err){
          res.json({
            ok:false,
            mensaje:err
          })
         }else{
          let sql1=`INSERT INTO seccionuser(idseccion, iduser, bodega) values?`
          let valuess = []
          for (let i = 0; i < pruebas.length; i++) {
              valuess.push([pruebas[i].idseccion,numeroEmpleado,bodega])
          }
  
          
  
       
         sql.query(sql1, [valuess], (err, resp) => {
        
            if (err) {
                res.json({
                    ok: false,
                    mensaje: err
                })
            } else {
                res.json({
                    ok: true,
                    mensaje: 'todo registrado'
                })
            }
        })
         }
       })
      }
    })
  }
  

  module.exports =
{


registropediweb,
seccionesrswe,
obtenerusuarios,
eliminarusuario,
detalleUser,
actuzaliarseccion
}