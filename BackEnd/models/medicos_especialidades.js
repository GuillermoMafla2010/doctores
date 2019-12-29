'use strict';
module.exports = (sequelize, DataTypes) => {
  const medicos_especialidades = sequelize.define('medicos_especialidades', {
    
    medico_id: {
      type:DataTypes.NUMBER,
      references:'medicos',
      referencesKey:'id'
    },
    especialidad_id:{
      type:DataTypes.NUMBER,
      references:'especialidades',
      referencesKey:'id'
    } 
  }, {timestamps: false},{underscored: true});
  medicos_especialidades.associate = function(models) {
    // associations can be defined here
    medicos_especialidades.belongsTo(models.Medicos,{foreignKey:'id'})
    medicos_especialidades.belongsTo(models.Especialidades,{as:'Especialidad' ,foreignKey:'id'})
  };
  return medicos_especialidades;
};