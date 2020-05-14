const server = require('./server')

//Llamada a los controladores
/*const pacientes=require('./rest_api/pacientesController')
const medicos= require('./rest_api/medicosController')
const medicos_especialidades=require('./rest_api/medicos_especialidadesController')*/
const horas=require('./rest_api/horasController')
const citas=require('./rest_api/citasController')
const especialidades=require('./rest_api/especialidadesController')
const usuariosespecialidades=require('./rest_api/usuariosespecialidades')
const login=require('./rest_api/loginController')
const usuarios=require('./rest_api/usuariosController')
const recetas=require('./rest_api/recetasController')
const medicamentos=require('./rest_api/medicamentosController')
const recetasmedicamentos=require('./rest_api/recetasmedicamentosController')
const sockets=require('./rest_api/sockets')