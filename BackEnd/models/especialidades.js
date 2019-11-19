'use strict';
module.exports = (sequelize, DataTypes) => {
  const Especialidades = sequelize.define('Especialidades', {
    id: DataTypes.NUMBER,
    nombre_especialidad: DataTypes.STRING
  }, {});
  Especialidades.associate = function(models) {
    // associations can be defined here
  };
  return Especialidades;
};