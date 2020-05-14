'use strict';
module.exports = (sequelize, DataTypes) => {
  const receta = sequelize.define('receta', {
    diagnostico: DataTypes.STRING,
    

    cita_id:{
      type:DataTypes.INTEGER,
      references:'citas',
      referencesKey:'id'
    } 
  }, {
    timestamps:false
  });
  receta.associate = function(models) {
    // associations can be defined here

    receta.belongsTo(models.citas,{foreignKey:'cita_id'})
    //receta.belongsToMany(models.medicamentos,{through:models.recetasmedicamentos , foreignKey:'receta_id'});

    receta.hasMany(models.recetasmedicamentos,{foreignKey:'receta_id'})
  };
  return receta;
};