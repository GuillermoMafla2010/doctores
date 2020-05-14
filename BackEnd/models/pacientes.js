'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pacientes = sequelize.define('Pacientes', {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    
    celular: DataTypes.STRING,
    email: DataTypes.STRING,
    
  }, {
    timestamps: false,
  });
  Pacientes.associate = function(models) {
    // associations can be defined here
    //Pacientes.hasMany(models.citas,{foreignKey:'paciente_id',targetKey: 'paciente_id'});
    
  
  };
  return Pacientes;
};