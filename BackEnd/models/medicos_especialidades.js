'use strict';
module.exports = (sequelize, DataTypes) => {
  const medicos_especialidades = sequelize.define('medicos_especialidades', {
    
    medico_id: DataTypes.NUMBER,
    especialidad_id: DataTypes.NUMBER
  }, {});
  medicos_especialidades.associate = function(models) {
    // associations can be defined here
    medicos_especialidades.belongsTo(models.Medicos)
    medicos_especialidades.belongsTo(models.Especialidades)
  };
  return medicos_especialidades;
};