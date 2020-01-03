const Sequalize=require('sequelize');
const server=require('../server').app
const models=require('../models/index')
const cors=require('cors')
const bodyparser=require('body-parser')
server.use(cors())
server.use(bodyparser.urlencoded({extended:false}))





//Metodo para guardar el id del medico y el id de la especialidad
server.post("/medicos_especialidad",(req,res)=>{
    let body = req.body
    let pacientes_nuevo=models.medicos_especialidades.create({
       'medico_id':body.medico_id,
       'especialidad_id':body.especialidad_id
    }).then(resultado=>{
        res.json({medicos:resultado})
    })
});


//Metodo para eliminar a una especialidad asociada a un doctor
server.delete("/medicos_especialidad/:id",(req,res)=>{
    let id= req.params.id
    models.medicos_especialidades.destroy({where:{id:id}}).then(resp=>{
        res.json({respuesta:"Especialidad eliminada"})
    })
})