const Sequalize=require('sequelize');
const server=require('../server').app
const models=require('../models/index')
const cors=require('cors')
const bodyparser=require('body-parser')
server.use(cors())
server.use(bodyparser.urlencoded({extended:false}))
const {verificartoken}=require('../middlewares/autenticacion')




//Metodo que retorna TODAS las especialidades
server.get("/especialidades" , verificartoken ,(req,res)=>{
    
    /*models.Especialidades.findAll().then(espec=>{
        res.json({
            espec
        })
    })*/

    models.Especialidades.findAll().then(spec=>{
        res.json({spec})
    })

})


//Metodo que encuentra el id segun el nombre de la especialidad
server.get("/especialidades/:nombre" ,verificartoken,(req,res)=>{
    
    let nombre=req.params.nombre
    models.Especialidades.findAll({where:{nombre_especialidad:nombre}}).then(id=>{
        res.json({id});
    })
})

//Metodo que encuentra una especialidad segun el id 
server.get("/especialidad/:id" ,verificartoken,(req,res)=>{
    let id=req.params.id
    models.Especialidades.findAll({where:{id:id}}).then(id=>{
        res.json({id});
    })
})


//Metodo para crear una nueva especialidad
server.post("/especialidades" ,verificartoken,(req,res)=>{
    let body = req.body
    

    models.Especialidades.create({
        nombre_especialidad:body.nombre_especialidad
    }).then(response=>{
        res.json("Especialidad creada")
    })
})


//Metodo para eliminar a una especialidad de la base de datos
server.delete("/especialidades/:id" ,verificartoken,(req,res)=>{
    let id= req.params.id
    models.Especialidades.destroy({where:{id:id}}).then(resp=>{
        res.json({respuesta:"Especialidad eliminada"})
    })
})


//metodo para actualizar una especialidad
server.put("/especialidades/:id" ,verificartoken,(req,res)=>{
    let id=req.params.id;
    let body=req.body;

    models.Especialidades.update({
        nombre_especialidad:body.nombre_especialidad
    },{where:{id:id}}).then(x=>{
        res.json({
            mensaje:"Especialidad Actualizada"
        })
    })
})

//Obtiene todos los doctores de una especialidad


server.get("/doctores_especialidad/:id" ,verificartoken,(req,res)=>{
    let id=req.params.id

    //METODO IMPORTNATE
    //con el attributes:[] no muestra los roles cuando se invoca el json
    models.Especialidades.findOne({where:{id:id}, 
        include:[ {model:models.Usuarios ,attributes:{exclude:['password','fecha_nacimiento','cedula','email']}, through :{attributes:[]}}]  }).then(medicos=>{res.json({medicos})})

})


