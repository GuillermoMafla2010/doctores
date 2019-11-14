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


//Metodo para guardar un paciente
server.post('/pacientes',(req,res)=>{
    let body=req.body

    models.Pacientes.create({
        nombre:body.nombre , apellido:body.apellido , email:body.email , celular:body.celular
    }).then(paciente=>{


        res.json({
            ok:true,
            paciente:paciente
        })
    })
})


