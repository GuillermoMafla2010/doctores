'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuarios = sequelize.define('Usuarios', {
    
    nombres:DataTypes.STRING,
    apellidos:DataTypes.STRING,
    fecha_nacimiento:DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    cedula: DataTypes.STRING,
    genero:DataTypes.BOOLEAN,
    foto:DataTypes.STRING

    
    
    
  }, {timestamps: false});
  Usuarios.associate = function(models) {
    // associations can be defined here
    //El foreign key y target key es para especificar el nombre de la columna en la tabla medicos_especialidades
   
    Usuarios.belongsToMany(models.Roles,{through:models.usuariosroles , foreignKey:'usuario_id'})
    Usuarios.belongsToMany(models.Especialidades,{through:models.usuariosespecialidades , foreignKey:'usuario_id', as:'especialidades'})
    Usuarios.hasMany(models.citas,{foreignKey:'usuario_id'})
    Usuarios.hasMany(models.citas,{foreignKey:'medico_id'})
      
  };


    
  return Usuarios;
};