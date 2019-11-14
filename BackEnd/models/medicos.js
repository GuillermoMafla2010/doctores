'use strict';
module.exports = (sequelize, DataTypes) => {
  const Medicos = sequelize.define('Medicos', {
    id: {type:DataTypes.INTEGER,
      primaryKey: true},
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    celular: DataTypes.STRING,
    email: DataTypes.STRING
  }, {timestamps: false});
  Medicos.associate = function(models) {
    // associations can be defined here
  };
  return Medicos;
};