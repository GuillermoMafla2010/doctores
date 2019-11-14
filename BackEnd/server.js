
 const cors=require('cors')
 const express=require('express');
 const app=express();
 const bodyparser=require('body-parser')
 app.use(cors())
 app.use(bodyparser.urlencoded({extended:false}))
 app.use(bodyparser.json());
 
 
 
 
 module.exports=app