'use strict';
module.exports = (sequelize, DataTypes) => {
  const medicamentos = sequelize.define('medicamentos', {
    nombre: DataTypes.STRING,
    fabricante: DataTypes.STRING
  }, {
    timestamps:false
  });
  medicamentos.associate = function(models) {
    // associations can be defined here

    //medicamentos.belongsToMany(models.receta,{through:models.recetasmedicamentos , foreignKey:'medicamento_id'})
    medicamentos.hasMany(models.recetasmedicamentos,{foreignKey:'medicamento_id'})
  };
  return medicamentos;
};