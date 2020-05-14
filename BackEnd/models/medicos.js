'use strict';
module.exports = (sequelize, DataTypes) => {
  const Medicos = sequelize.define('Medicos', {
    
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    celular: DataTypes.STRING,
    email: DataTypes.STRING,
    
    
  }, {timestamps: false});
  Medicos.associate = function(models) {
    // associations can be defined here
    //El foreign key y target key es para especificar el nombre de la columna en la tabla medicos_especialidades
    Medicos.hasMany(models.medicos_especialidades,{ 
      foreignKey: 'medico_id',
      targetKey: 'medico_id'})

      Medicos.hasMany(models.citas,{
        foreignKey:'medico_id',
        targetKey: 'medico_id'
      })

      
  };


    
  return Medicos;
};