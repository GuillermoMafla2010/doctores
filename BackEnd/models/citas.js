'use strict';
module.exports = (sequelize, DataTypes) => {
  const Citas = sequelize.define('Citas', {
    id: {type:DataTypes.INTEGER,
      primaryKey: true},
    sintomas: DataTypes.STRING,
    fecha: DataTypes.STRING,
    hora_id: DataTypes.INTEGER,
    medico_id: DataTypes.INTEGER,
    especialidad_id: DataTypes.INTEGER,
    paciente_id: DataTypes.INTEGER
  }, {
    timestamps: false,
  });
  Citas.associate = function(models) {
    // associations can be defined here
    Citas.belongsTo(models.Pacientes);
  };
  return Citas;
};