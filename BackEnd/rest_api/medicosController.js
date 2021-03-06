const Sequalize=require('sequelize');
const server=require('../server').app
const models=require('../models/index')
const cors=require('cors')
const bodyparser=require('body-parser')
server.use(cors())
server.use(bodyparser.urlencoded({extended:false}))


const medicos_especialidades=models.Medicos_Especialidades;
const especialidades=models.Especialidades;

//Metodo que retorna a todos los pacientes
server.get("/medicos",(req,res)=>{
    
    models.Medicos.findAll().then(medicos=>{
        res.json({
            medicos
        })
    })

})


//Metodo que retorna un medico segun su numero id
server.get("/medicos/:id",(req,res)=>{
    let id=req.params.id
    models.Medicos.findAll({ where:{id:id} , include:[{nested:true,all:true}] } ).then(medicos=>{res.json({medicos})})
})


//Metodo para guardar un medico
server.post("/medicos",(req,res)=>{
    let body = req.body
    let pacientes_nuevo=models.Medicos.create({
        nombre:body.nombre,
        apellido:body.apellido,
        email:body.email,
        celular:body.celular
    }).then(resultado=>{
        res.json({medicos:resultado})
    })
})


//Metodo para eliminar a un paciente de la base de datos
server.delete("/medicos/:id",(req,res)=>{
    let id= req.params.id
    models.Medicos.destroy({where:{id:id}}).then(resp=>{
        res.json({respuesta:"Usuario eliminado"})
    })
})


//Metodo para modificar a un medico
server.put("/medicos/:id",(req,res)=>{
    let body=req.body
    let id=req.params.id
    models.Medicos.update({
        nombre:body.nombre,
        apellido:body.apellido,
        email:body.email,
        celular:body.celular
    },{where:{
        id:id
    }}).then(categoria=>{
        res.json({
            mensaje:`Se actualizo con exito`
        })
    })
})



