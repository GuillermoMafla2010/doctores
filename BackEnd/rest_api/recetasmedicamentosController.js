const Sequalize=require('sequelize');
const server=require('../server').app
const models=require('../models/index')
const cors=require('cors')
const bodyparser=require('body-parser')
server.use(cors())
server.use(bodyparser.urlencoded({extended:false}))

const {verificartoken}=require('../middlewares/autenticacion')

server.post('/diagnostico',verificartoken,(req,res)=>{

    let body = req.body
    let pacientes_nuevo=models.recetasmedicamentos.create({
        receta_id:body.receta_id,
        medicamento_id:body.medicamento_id,
        dosis:body.dosis,
        indicaciones:body.indicaciones,
        
    }).then(medicamento=>{
        res.json({
            status:201,
           
            medicamento:medicamento

        })
    })

})


//Metodo para actualizar un medicamento de la receta
server.put("/diagnostico/:id" ,verificartoken,(req,res)=>{
    let body=req.body
    let id=req.params.id
    models.recetasmedicamentos.update({
        
        medicamento_id:body.medicamento_id,
        dosis:body.dosis,
        indicaciones:body.indicaciones,
    },{where:{
        id:id
    }}).then(diagnostico=>{
        res.json({
            mensaje:`Se actualizo con exito la receta`
        })
    })
})


//Metodo para eliminar a un paciente de la base de datos
server.delete("/diagnostico/:id",verificartoken,(req,res)=>{
    let id= req.params.id
    models.recetasmedicamentos.destroy({where:{id:id}}).then(resp=>{
        res.json({respuesta:"Medicamento Eliminado"})
    })
})
