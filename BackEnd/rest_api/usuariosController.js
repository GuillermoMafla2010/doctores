const Sequalize=require('sequelize');
const server=require('../server').app
const models=require('../models/index')
const cors=require('cors')
const bodyparser=require('body-parser')
const bcrypt=require('bcrypt');
server.use(cors())
server.use(bodyparser.urlencoded({extended:false}))
const jwt=require('jsonwebtoken')
const {verificartoken}=require('../middlewares/autenticacion')


const path=require('path')
const fileUpload=require("express-fileupload")
const fs=require('fs')
const uuid=require('uuid/v4')
server.use(fileUpload())


//Metodo que retorna un paciente segun su numero id
server.get("/usuarios/:id" ,(req,res)=>{
    let id=req.params.id
    models.Usuarios.findAll({where:{id:id},include:[{model:models.Roles  ,through :{attributes:[]}},{model:models.Especialidades ,as :'especialidades' }]}).then(usuario=>{res.json({usuario})})
})

//Metodo que retorna a todos los medicos
server.get("/medicos" ,(req,res)=>{
    models.Usuarios.findAll({include:[{model:models.Roles,where:{id:1},attributes:[]} , {model:models.Especialidades ,as:'especialidades'}]}).then(medicos=>{res.json({medicos})})
})


//Metodo que retorna a todos los pacientes
server.get("/pacientes" ,verificartoken,(req,res)=>{
    models.Usuarios.findAll({include:[{model:models.Roles,where:{id:2},attributes:[]}]}).then(paciente=>{res.json({paciente})})
})

//Metodo para guardar un medico
server.post("/medicos" ,verificartoken,(req,res)=>{
    let body = req.body
    let id=0;
    let pacientes_nuevo=models.Usuarios.create({
        nombres:body.nombres,
        apellidos:body.apellidos,
        email:body.email,
        celular:body.celular,
        cedula:body.cedula,
        password:bcrypt.hashSync(body.password,10),
        fecha_nacimiento:body.fecha_nacimiento,
        genero:body.genero


    }).then(resultado=>{
        models.usuariosroles.create({
            usuario_id:resultado.id,
            rol_id:1
        })

       

        res.json({medicos:resultado});
 
    }) 
})


//Metodo para eliminar un medico
server.delete("/medicos/:usuario_id",verificartoken ,(req,res)=>{
    
    let usuario_id= req.params.usuario_id

    models.usuariosroles.destroy({where:{rol_id:1,usuario_id:usuario_id}}).then(resp=>{
        res.json({respuesta:"Usuario eliminado"})
    })
})


//Metodo para eliminar un paciente
server.delete("/pacientes/:usuario_id" ,verificartoken,(req,res)=>{
    
    let usuario_id= req.params.usuario_id

    models.usuariosroles.destroy({where:{rol_id:2,usuario_id:usuario_id}}).then(resp=>{
        res.json({respuesta:"Usuario eliminado"})
    })
})

//Metodo para guardar un paciente
server.post("/pacientes" ,verificartoken,(req,res)=>{
    let body = req.body
    //let id=0;


    let pacientes_nuevo=models.Usuarios.create({
        nombres:body.nombres,
        apellidos:body.apellidos,
        email:body.email,
        celular:body.celular,
        cedula:body.cedula,
        password:bcrypt.hashSync(body.password,10),
        fecha_nacimiento:body.fecha_nacimiento,
        genero:body.genero,

    }).then(resultado=>{
        models.usuariosroles.create({
            usuario_id:resultado.id,
            rol_id:2
        })
        res.json({paciente:resultado});
 
    }) 
})

//Metodo para actualizar un paciente 
server.put("/pacientes_foto/:id" ,verificartoken,(req,res)=>{
    let body=req.body
    let id=req.params.id
    console.log(req.files)
    let archivo=req.files.archivo
    console.log(archivo)
    let pathDirectorio=path.resolve(__dirname,`../uploads`)
    let nombreunico=`${uuid()}_${archivo.name}`
   
    archivo.mv(`${pathDirectorio}/${nombreunico}`,(err,foto)=>{
        if(err){
            console.log({
                mensaje:"No se pudo subir la foto"
            })
        }
        
        console.log({
            mensaje:"Foto subida correctamente"
        })
    })

    models.Usuarios.update({
        foto:nombreunico
    },{where:{
        id:id
    }}).then(foto=>{
        res.json({
            mensaje:`Se subio la foto con exito`
        })
    })
})



//Metodo para retornar un medico por id
server.get("/medicos/:id" ,verificartoken,(req,res)=>{
    let id=req.params.id

    //METODO IMPORTNATE
    //con el attributes:[] no muestra los roles cuando se invoca el json
    models.Usuarios.findOne({where:{id:id}, attributes:{exclude:['password']},
        include:[{model:models.Roles,where:{id:1},attributes:[]} ,{model:models.Especialidades , through :{attributes:[]}, as: 'especialidades'}]  }).then(medicos=>{res.json({medicos})})

})



//Metodo para retornar un medico por su email
server.get("/medicos_email/:email" ,verificartoken,(req,res)=>{
    let email=req.params.email

    //METODO IMPORTNATE
    //con el attributes:[] no muestra los roles cuando se invoca el json
    models.Usuarios.findOne({where:{email:email}, attributes:{exclude:['password']},
        include:[{model:models.Roles,where:{id:1},attributes:[]} ,{model:models.Especialidades , through :{attributes:[]}, as: 'especialidades'}]  }).then(medicos=>{res.json({medicos})})

})

//Metodo que retorna un paciente segun su numero id
server.get("/pacientes/:id" ,verificartoken,(req,res)=>{
    let id=req.params.id
    models.Usuarios.findOne({where:{id:id}, attributes:{exclude:['password']},
    include:[{model:models.Roles,where:{id:2},attributes:[]} ,{model:models.Especialidades , through :{attributes:[]}, as: 'especialidades'}]  }).then(paciente=>{res.json({paciente})})
})


//Metodo para actualizar un medico
server.put("/medicos/:id" ,verificartoken,(req,res)=>{
    let body=req.body
    let id=req.params.id
    models.Usuarios.update({
        nombres:body.nombres,
        apellidos:body.apellidos,
        email:body.email,
        celular:body.celular,
        cedula:body.cedula,
        fecha_nacimiento:body.fecha_nacimiento,
        genero:body.genero
    },{where:{
        id:id
    }}).then(categoria=>{
        res.json({
            mensaje:`Se actualizo con exito`
        })
    })
})





//Metodo para actualizar un paciente 
server.put("/pacientes/:id" ,verificartoken,(req,res)=>{
    let body=req.body
    let id=req.params.id
    models.Usuarios.update({
        nombres:body.nombres,
        apellidos:body.apellidos,
        email:body.email,
        celular:body.celular,
        cedula:body.cedula,
        fecha_nacimiento:body.fecha_nacimiento,
        genero:body.genero
    },{where:{
        id:id
    }}).then(categoria=>{
        res.json({
            mensaje:`Se actualizo con exito`
        })
    })
})


//Metodo para mostrar imagen
server.get("/verfoto/:id",(req,res)=>{
    let id=req.params.id
    models.Usuarios.findOne({
        where:{id:id}
    }).then(foto=>{
        let pathImagen=path.resolve(__dirname,`../uploads/${foto.foto}`)
        if(fs.existsSync(pathImagen)){
            res.sendFile(pathImagen)
        }
    })
})


//Verifica el login (Usuario y contraseña)
server.post("/login",(req,res)=>{
    let body=req.body
    //console.log(body.password)
    models.Usuarios.findOne({
        include:[{model:models.Roles, through:{attributes:[]}}] ,where:{email:body.email}
    }).then(password=>{
        
        if(!bcrypt.compareSync(body.password,password.password)){
            
            res.json({
                status:400,
                mensaje:"Contraseña incorrecta"
            })
        }else{

            let token=jwt.sign({
                usuario:password.email,
                id:password.id,
                roles:password.Roles
                
                },
                'clavesecreta',
                {expiresIn:'1h'}
            )
            res.json({
                ok:true,
                token:token,
                usuario:{id:password.id,nombres:password.nombres,apellidos:password.apellidos,email:password.email,Roles:password.Roles},
                status:200
            })
        }
    }).catch(error=>{
        //console.log(error)
        res.json({
            status:400,
            mensaje:"Usuario o contraseña incorrectos"
        })
    })
})









