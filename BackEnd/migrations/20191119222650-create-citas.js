'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('citas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.NUMBER
      },
      sintomas: {
        type: Sequelize.STRING
      },
      fecha: {
        type: Sequelize.DATE
      },
      solucion: {
        type: Sequelize.STRING
      },
      hora_id: {
        type: Sequelize.NUMBER
      },
      medico_id: {
        type: Sequelize.NUMBER
      },
      especialidad_id: {
        type: Sequelize.NUMBER
      },
      paciente_id: {
        type: Sequelize.NUMBER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('citas');
  }
};