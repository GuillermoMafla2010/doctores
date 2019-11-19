const server = require('./server')

//Llamada a los controladores
const pacientes=require('./rest_api/pacientesController')
const medicos= require('./rest_api/medicosController')
const sockets=require('./rest_api/sockets')