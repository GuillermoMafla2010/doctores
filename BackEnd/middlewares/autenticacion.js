const jwt =require ('jsonwebtoken')

let verificartoken=(req,res,next)=>{
    let token=req.get('token')
    console.log(req.usuario)
    console.log(token)
    jwt.verify(token,'clavesecreta',(err,decoded)=>{
        if(err){
            return res.status(401).json({
                ok:false,
                err:{
                    message:'No autorizado'
                }
            })
        }
        
        req.usuario=decoded.usuario
        next();
    })
}





module.exports={verificartoken}