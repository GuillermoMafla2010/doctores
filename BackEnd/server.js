
 const cors=require('cors')
 const express=require('express');
 const app=express();
 const bodyparser=require('body-parser')
 app.use(cors())
 app.use(bodyparser.urlencoded({extended:false}))
<<<<<<< HEAD
 app.use(bodyparser.json());
=======
 app.use(bodyparser.json())
 
>>>>>>> 70584433dba757dc0fc0d7e0a9f209764c405e9b
 
 
 
 
 module.exports=app