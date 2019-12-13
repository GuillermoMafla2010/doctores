const Sequalize=require('sequelize');
const server=require('../server').app
const models=require('../models/index')
const cors=require('cors')
const bodyparser=require('body-parser')
server.use(cors())
server.use(bodyparser.urlencoded({extended:false}))




//Metodo que retorna TODAS las especialidades
server.get("/especialidades",(req,res)=>{
    
    /*models.Especialidades.findAll().then(espec=>{
        res.json({
            espec
        })
    })*/

    models.Especialidades.findAll().then(spec=>{
        res.json({spec})
    })

})



