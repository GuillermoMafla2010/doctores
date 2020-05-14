'use strict';
module.exports = (sequelize, DataTypes) => {
  const citas = sequelize.define('citas', {
    
    
    fecha: DataTypes.STRING,
   
    hora_id: DataTypes.NUMBER,
    medico_id: DataTypes.NUMBER,
    especialidad_id:{
      type:DataTypes.NUMBER,
      references:'especialidades',
      referencesKey:'id'
    } ,
    usuario_id: DataTypes.NUMBER,
    estado:DataTypes.BOOLEAN
  }, {timestamps:false});
  citas.associate = function(models) {
    // associations can be defined here

    /*citas.belongsTo(models.Pacientes,{foreignKey: 'paciente_id',targetKey: 'id'})
    citas.belongsTo(models.Medicos,{foreignKey: 'medico_id',targetKey: 'id'})
    citas.belongsTo(models.horas,{foreignKey: 'hora_id',targetKey: 'id'});
    citas.belongsTo(models.Especialidades,{foreignKey:'especialidad_id',targetKey: 'id'})*/
    //citas.belongsTo(models.medicos,{foreignKey: 'medico_id',targetKey: 'id'})

    citas.belongsTo(models.Usuarios,{foreignKey:'usuario_id' , as :'Paciente'})
    citas.belongsTo(models.Usuarios,{foreignKey:'medico_id', as :'Medico'})
    citas.belongsTo(models.horas,{foreignKey:'hora_id'})
    citas.belongsTo(models.Especialidades,{foreignKey:'especialidad_id'})
    citas.hasOne(models.receta,{foreignKey:'cita_id' , as : 'recetas'})
    
    
  };
  return citas;
};