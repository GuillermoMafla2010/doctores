'use strict';
module.exports = (sequelize, DataTypes) => {
  const Medicos = sequelize.define('Medicos', {
    
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    celular: DataTypes.STRING,
    email: DataTypes.STRING
  }, {timestamps: false});
  Medicos.associate = function(models) {
    // associations can be defined here
    Medicos.hasMany(models.medicos_especialidades)
  };
  return Medicos;
};