'use strict';
module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    
    nombre_rol: DataTypes.STRING,
    
    
    
    
  }, {timestamps: false});
  Roles.associate = function(models) {
    // associations can be defined here
    //El foreign key y target key es para especificar el nombre de la columna en la tabla medicos_especialidades
   
      Roles.belongsToMany(models.Usuarios,{through:models.usuariosroles , foreignKey:'rol_id'})
  };


    
  return Roles;
};