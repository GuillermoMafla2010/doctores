const Sequalize=require('sequelize');
const server=require('../server').app
const models=require('../models/index')
const cors=require('cors')
const bodyparser=require('body-parser')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
server.use(cors())
server.use(bodyparser.urlencoded({extended:false}))








server.post("/crearusuario",(req,res)=>{
    let body=req.body

    models.Usuarios.create({
        email:body.email,
        password:bcrypt.hashSync(body.password,10),
        usuarios_roles:body.usuarios_roles
    }).then(usuario=>{
        res.json({mensaje:" Creado con exito"});
    })
})