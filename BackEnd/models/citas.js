'use strict';
module.exports = (sequelize, DataTypes) => {
  const citas = sequelize.define('citas', {
    id: DataTypes.NUMBER,
    sintomas: DataTypes.STRING,
    fecha: DataTypes.DATE,
    solucion: DataTypes.STRING,
    hora_id: DataTypes.NUMBER,
    medico_id: DataTypes.NUMBER,
    especialidad_id: DataTypes.NUMBER,
    paciente_id: DataTypes.NUMBER
  }, {});
  citas.associate = function(models) {
    // associations can be defined here
  };
  return citas;
};