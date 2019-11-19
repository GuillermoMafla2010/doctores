
 const cors=require('cors')
 const express=require('express');
 
 const app=express(),
       server=require('http').createServer(app),
       io=require('socket.io').listen(server)//io.listen(server)
 const bodyparser=require('body-parser')

 
 
 const path=require('path')

 app.use(cors());
 app.use(bodyparser.urlencoded({extended:false}));
 app.use(bodyparser.json());
 app.use(express.static(path.join(__dirname, './public')))//middleware de express para archivos estaticos
 
 
 
 
 
 module.exports= {app,io}