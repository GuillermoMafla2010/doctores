'use strict';
module.exports = (sequelize, DataTypes) => {
  const horas = sequelize.define('horas', {
   
    horas_laborables: DataTypes.STRING
  }, {timestamps: false});
  horas.associate = function(models) {
    // associations can be defined here
    horas.hasMany(models.citas,{foreignKey: 'hora_id'});

  };
  return horas;
};