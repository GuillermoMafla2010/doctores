'use strict';
module.exports = (sequelize, DataTypes) => {
  const horas = sequelize.define('horas', {
    id: DataTypes.NUMBER,
    horas_laborables: DataTypes.STRING
  }, {});
  horas.associate = function(models) {
    // associations can be defined here
  };
  return horas;
};