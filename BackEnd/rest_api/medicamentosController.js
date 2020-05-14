const Sequalize=require('sequelize');
const server=require('../server').app
const models=require('../models/index')
const cors=require('cors')
const bodyparser=require('body-parser')
server.use(cors())
server.use(bodyparser.urlencoded({extended:false}))
const {verificartoken}=require('../middlewares/autenticacion')

//Obtiene todos los medicamentos existentes
server.get('/medicamentos',verificartoken,(req,res)=>{
    models.medicamentos.findAll().then(medicamentos=>{
        res.json({
            status:200,
            medicamentos:medicamentos
        })
    })
})

//Crea un medicamento
server.post("/medicamentos",verificartoken,(req,res)=>{
    let body = req.body
    let pacientes_nuevo=models.medicamentos.create({
        nombre:body.nombre,
        fabricante:body.fabricante,
        
    }).then(medicamento=>{
        res.json({
            status:201,
            mensaje: 'Los medicamentos ha sido ingresado exitosamente',
            medicamento:medicamento

        })
    })
})

//Obtiene una medicina por su id
server.get("/medicamentos/:id",verificartoken,(req,res)=>{
    let id=req.params.id

    models.medicamentos.findAll({where:{id:id}}).then(medicamento=>{
        res.json({
            status:200,
            medicamento:medicamento
        })
    })
})

