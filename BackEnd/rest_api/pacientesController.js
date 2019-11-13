const Sequalize=require('sequelize');
const server=require('../server')
const models=require('../models/index')
const cors=require('cors')


//Metodo que retorna a todos los pacientes
server.get("/pacientes",(req,res)=>{
    
    models.Pacientes.findAll().then(pacientes=>{
        res.json({
            pacientes:pacientes
        })
    })

})


//Metodo que retorna un paciente segun su numero id

server.get("/pacientes/:id",(req,res)=>{
    let id=req.params.id
    models.Pacientes.findAll({/*include:[{all:true,nested:true}] ,*/where:{id:id}}).then(paciente=>{res.json({paciente})})
})

