'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pacientes = sequelize.define('Pacientes', {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    id: {type:DataTypes.INTEGER,
      primaryKey: true},
    celular: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    timestamps: false,
  });
  Pacientes.associate = function(models) {
    // associations can be defined here
    Pacientes.hasMany(models.Citas,{
      foreignKey:'paciente_id'
    })
  };
  return Pacientes;
};