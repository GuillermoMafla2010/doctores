const server = require('./server')

//Llamada a los controladores
const pacientes=require('./rest_api/pacientesController')
const medicos= require('./rest_api/medicosController')
const especialidades=require('./rest_api/especialidadesController')
const medicos_especialidades=require('./rest_api/medicos_especialidadesController')
const sockets=require('./rest_api/sockets')