const Sequalize=require('sequelize');
const server=require('../server').app
const models=require('../models/index')
const cors=require('cors')
const bodyparser=require('body-parser')
server.use(cors())
server.use(bodyparser.urlencoded({extended:false}))
const {verificartoken}=require('../middlewares/autenticacion')

//Endpoint que retorna todas las horas de trabajo disponibles

server.get("/horas", verificartoken, (req,res)=>{
    
    /*models.Especialidades.findAll().then(espec=>{
        res.json({
            espec
        })
    })*/

    models.horas.findAll().then(horas=>{
        res.json({horas})
    })

})


//Metodo para encontrar una hora por su id
server.get("/horas/:id", verificartoken,(req,res)=>{
    let id=req.params.id
    models.horas.findAll({where:{id:id}}).then(horas=>{
        res.json({horas})
    })
})