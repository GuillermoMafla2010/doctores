'use strict';
module.exports = (sequelize, DataTypes) => {
  const usuariosespecialidades = sequelize.define('usuariosespecialidades', {
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
  usuariosespecialidades.associate = function(models) {
    // associations can be defined here
    //El foreign key y target key es para especificar el nombre de la columna en la tabla medicos_especialidades
   
      //models.Usuarios.belongsToMany(models.Usuarios,{thought:'usuariosespecialidades'})
  };


    
  return usuariosespecialidades;
};