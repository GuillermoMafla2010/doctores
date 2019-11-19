//Llamada al servidor
const server=require('./server').app



//Llamada al archivo que contiene todas las rutas
const rutas = require('./rutas')

server.listen(3001,()=>{
    console.log("Servidor inicializado");
})
