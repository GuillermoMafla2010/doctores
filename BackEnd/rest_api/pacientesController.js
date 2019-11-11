const Sequalize=require('sequelize');
const server=require('../server')
const models=require('../models/index')
const cors=require('cors')

server.get("/pacientes",(req,res)=>{
    
    models.Pacientes.findAll().then(pacientes=>{
        res.json({
            pacientes:pacientes
        })
    })

})

