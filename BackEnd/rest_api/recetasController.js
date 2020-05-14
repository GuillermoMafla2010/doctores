const Sequalize=require('sequelize');
const server=require('../server').app
const models=require('../models/index')
const cors=require('cors')
const bodyparser=require('body-parser')
server.use(cors())
server.use(bodyparser.urlencoded({extended:false}))
const {verificartoken}=require('../middlewares/autenticacion')



//Obtiene la receta realizada por el especialista 
server.get('/receta/:id',verificartoken,(req,res)=>{

    let cita_id=req.params.id;

    models.receta.findAll({where:{cita_id:cita_id} , include:[{model:models.recetasmedicamentos , include:[{model:models.medicamentos}]} ] }).then(receta=>{
        if(receta.length==0){
            res.json({
                mensaje:'No existen recetas para la cita'
            })
        }else{
            res.json({
                status:200,
                receta:receta
            })
        }
    })
});






server.post('/receta',verificartoken,(req,res)=>{

    let body = req.body
    let pacientes_nuevo=models.receta.create({
        diagnostico:body.diagnostico,
        cita_id:body.cita_id,
        
    }).then(receta=>{
        res.json({
            status:201,
           
            receta:receta

        })
    })

})



//Metodo para modificar a una receta
server.put("/receta/:id",verificartoken,(req,res)=>{
    let body=req.body
    let id=req.params.id
    models.receta.update({
        diagnostico:body.diagnostico,
        cita_id:body.cita_id,
    },{where:{
        id:id
    }}).then(receta=>{
        res.json({
            mensaje:`Se actualizo con exito la receta`
        })
    })
})