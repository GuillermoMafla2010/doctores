const Sequalize=require('sequelize');
const server=require('../server').app
const models=require('../models/index')
const cors=require('cors')
const bodyparser=require('body-parser')
server.use(cors())
server.use(bodyparser.urlencoded({extended:false}))
const {verificartoken}=require('../middlewares/autenticacion')




//Metodo para guardar el id del medico y el id de la especialidad
server.post("/medicos_especialidad",verificartoken,(req,res)=>{
    let body = req.body
   
    let pacientes_nuevo=models.usuariosespecialidades.create({
       'usuario_id':body.usuario_id,
       'especialidad_id':body.especialidad_id
    }).then(resultado=>{
        res.json({medicos:resultado})
    })
});


//Metodo para eliminar a una especialidad asociada a un doctor
server.delete("/medicos_especialidad/:especialidad_id/:usuario_id",verificartoken,(req,res)=>{
    let especialidad_id= req.params.especialidad_id
    let usuario_id= req.params.usuario_id

    models.usuariosespecialidades.destroy({where:{usuario_id:usuario_id , especialidad_id:especialidad_id}}).then(resp=>{
        res.json({respuesta:"Especialidad eliminada"})
    })
})


