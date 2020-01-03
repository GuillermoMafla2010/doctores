'use strict';
module.exports = (sequelize, DataTypes) => {
  const Especialidades = sequelize.define('Especialidades', {
    

    nombre_especialidad: DataTypes.STRING
  },{timestamps: false});
  Especialidades.associate = function(models) {
    // associations can be defined here
    //El foreign key y target key es para especificar el nombre de la columna en la tabla medicos_especialidades
    Especialidades.hasMany(models.medicos_especialidades,{
      foreignKey: 'especialidad_id'
      ,targetKey: 'especialidad_id',
      
     
    })
  };
  return Especialidades;
};


