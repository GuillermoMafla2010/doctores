'use strict';
module.exports = (sequelize, DataTypes) => {
  const medicos_especialidades = sequelize.define('medicos_especialidades', {
    id: DataTypes.NUMBER,
    medico_id: DataTypes.NUMBER,
    especialidad_id: DataTypes.NUMBER
  }, {});
  medicos_especialidades.associate = function(models) {
    // associations can be defined here
  };
  return medicos_especialidades;
};