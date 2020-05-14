'use strict';
module.exports = (sequelize, DataTypes) => {
  const usuariosroles = sequelize.define('usuariosroles', {
    /*
    usuario_id:{
        type:DataTypes.INTEGER,
        references:{
            model:Usuarios,
            key:'id'
        }
    },




    rol_id:{
        type:DataTypes.INTEGER,
        references:{
            model:Roles,
            key:'id'
        }
    }
    
    */
    
    
  }, {timestamps: false});
  usuariosroles.associate = function(models) {
    // associations can be defined here
    //El foreign key y target key es para especificar el nombre de la columna en la tabla medicos_especialidades
   
      //models.Usuarios.belongsToMany(models.Usuarios,{thought:'UsuariosRoles'})
  };


    
  return usuariosroles;
};