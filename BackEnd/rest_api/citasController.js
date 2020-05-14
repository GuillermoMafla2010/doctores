const Sequalize = require("sequelize");
const server = require("../server").app;
const models = require("../models/index");
const cors = require("cors");
const bodyparser = require("body-parser");
server.use(cors());
server.use(bodyparser.urlencoded({ extended: false }));
const { Op } = require("sequelize");
const { verificartoken } = require("../middlewares/autenticacion");

//Obtiene todas las citas generadas
server.get("/citas", verificartoken, (req, res) => {
  models.citas
    .findAll({ include: [{ nested: true, all: true }] })
    .then((citas) => {
      if (citas.length == 0) {
        citas = "No hay citas registradas";
      }

      res.json({ citas });
    });
});

//Obtiene todas las citas dependiendo del doctor
server.get("/citas/:medico_id/:fecha", verificartoken, (req, res) => {
  let medico_id = req.params.medico_id;
  let fecha = req.params.fecha;
  let fecha_corta = fecha.split(" ");

  models.citas
    .findAll({
      where: { medico_id: medico_id, fecha: fecha_corta[0], estado: 0 },
      include: [
        { model: models.Usuarios, as: "Paciente" },
        { model: models.horas },
        { model: models.Especialidades },
      ],
      order: [["id", "ASC"]],
    })
    .then((citas) => {
      res.json({ citas });
    });
});

//Obtiene todas las citas dependiendo del doctor
server.get("/citas_editar/:medico_id/:fecha", verificartoken, (req, res) => {
  let medico_id = req.params.medico_id;
  let fecha = req.params.fecha;
  let fecha_corta = fecha.split(" ");

  models.citas
    .findAll({
      where: { medico_id: medico_id, fecha: fecha_corta[0] },
      include: [{ nested: false, all: true }],
      attributes: { exclude: ["especialidad_id", "hora_id"] },
      order: [["id", "ASC"]],
    })
    .then((citas) => {
      res.json({ citas });
    });
});

//Obtener una cita dependiendo del id de la cita
server.get("/citas/:id", verificartoken,(req, res) => {
  let id = req.params.id;

  models.citas
    .findAll({
      where: { id: id },
      include: [
        { model: models.horas },
        { model: models.Especialidades },
        {
          model: models.Usuarios,
          as: "Paciente",
          attributes: {
            exclude: ["fecha_nacimiento", "password", "cedula", "genero"],
          },
        },
        {
          model: models.Usuarios,
          as: "Medico",
          attributes: {
            exclude: ["fecha_nacimiento", "password", "cedula", "genero"],
          },
          include: [{ model: models.Especialidades, as: "especialidades" }],
        },
      ],
    })
    .then((citas) => {
      res.json({ citas });
    });
});

//Guarda una cita
server.post("/citas",verificartoken, (req, res) => {
  let body = req.body;
  console.log(body);
  models.citas
    .create({
      especialidad_id: body.especialidad_id,
      fecha: body.fecha,
      hora_id: body.hora_id,
      medico_id: body.medico_id.id,
      usuario_id: body.usuario_id.id,
      estado: 0,
    })
    .then((cita) => {
      res.json({ mensaje: "Cita creada exitosamente", status: 200 });
    });
});

server.delete("/citas/:id",verificartoken, (req, res) => {
  let id = req.params.id;

  models.citas.destroy({ where: { id: id } }).then((cita) => {
    res.json({
      status: 200,
      mensaje: "Se ha eliminado la cita correctamente",
    });
  });
});

//Actualizar una cita
server.put("/citas/:id", verificartoken,(req, res) => {
  let body = req.body;
  let id = req.params.id;
  models.citas
    .update(
      {
        especialidad_id: body.especialidad_id,
        fecha: body.fecha,
        hora_id: body.hora_id,
        medico_id: body.medico_id,
        paciente_id: body.paciente_id,
      },
      {
        where: {
          id: id,
        },
      }
    )
    .then((cita) => {
      res.json({
        mensaje: `Se actualizo con exito`,
        status: 200,
      });
    });
});

//Actualizar una cita cuando ya es atendida
server.put("/cita_atendida/:id", verificartoken,(req, res) => {
  let id = req.params.id;
  models.citas
    .update(
      {
        estado: 1,
      },
      { where: { id: id } }
    )
    .then((cita) => {
      res.json({
        status: 200,
        mensaje: "La cita fue marcada como atendida",
      });
    });
});


//Ver las citas dependiendo del paciente
server.get("/cita_paciente/:id",verificartoken,(req,res)=>{
    let id = req.params.id;

    models.citas
      .findAll({
        where: { usuario_id: id },
        include: [
          { model: models.horas },
          { model: models.Especialidades },
          {
            model: models.Usuarios,
            as: "Paciente",
            attributes: {
              exclude: ["fecha_nacimiento", "password", "cedula", "genero"],
            },
          },
          {
            model: models.Usuarios,
            as: "Medico",
            attributes: {
              exclude: ["fecha_nacimiento", "password", "cedula", "genero"],
            },
            //include: [{ model: models.Especialidades, as: "especialidades" }],
          },
        ],
      })
      .then((citas) => {
        res.json({ citas });
      });
})


//Obtiene todas las citas COMPLETADAS dependiendo del paciente
server.get("/citas_completadas/:id", verificartoken, (req, res) => {
  let id = req.params.id
  

  models.citas
    .findAll({
      where: { usuario_id:id, estado: 1},
      include: [
        { model: models.Usuarios, as: "Paciente" , attributes:{exclude:['password','cedula','fecha_nacimiento']}},
        { model: models.horas },
        { model: models.Especialidades },
        { model: models.Usuarios, as:"Medico" , attributes:{exclude:['password','cedula','fecha_nacimiento']}}
        
      ],
      order: [["id", "ASC"]],
    })
    .then((citas) => {
      res.json({ citas });
    });
});


//Obtiene todas las citas COMPLETADAS dependiendo del paciente
server.get("/citas_completadas_medicos/:id", (req, res) => {
  let id = req.params.id
  

  models.citas
    .findAll({
      where: { medico_id:id, estado: 1},
      include: [
        { model: models.Usuarios, as: "Paciente" , attributes:{exclude:['password','cedula','fecha_nacimiento']}},
        { model: models.horas },
        { model: models.Especialidades },
        { model: models.Usuarios, as:"Medico" , attributes:{exclude:['password','cedula','fecha_nacimiento']}}
        
      ],
      order: [["id", "ASC"]],
    })
    .then((citas) => {
      res.json({ citas });
    });
});