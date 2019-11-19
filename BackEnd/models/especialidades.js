'use strict';
module.exports = (sequelize, DataTypes) => {
  const Especialidades = sequelize.define('Especialidades', {
    
    nombre_especialidad: DataTypes.STRING
  }, {});
  Especialidades.associate = function(models) {
    // associations can be defined here
    Especialidades.hasMany(models.medicos_especialidades)
  };
  return Especialidades;
};