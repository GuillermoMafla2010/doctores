'use strict';
module.exports = (sequelize, DataTypes) => {
  const recetasmedicamentos = sequelize.define('recetasmedicamentos', {
    receta_id: DataTypes.INTEGER,
    medicamento_id: DataTypes.INTEGER,
    dosis: DataTypes.INTEGER,
    indicaciones: DataTypes.INTEGER,
  }, {timestamps:false});
  recetasmedicamentos.associate = function(models) {
    // associations can be defined here

    recetasmedicamentos.belongsTo(models.receta,{foreignKey:'receta_id'})
    recetasmedicamentos.belongsTo(models.medicamentos,{foreignKey:'medicamento_id'})
  };
  return recetasmedicamentos;
};