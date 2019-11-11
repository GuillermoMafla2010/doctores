'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Citas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.INTEGER
      },
      sintomas: {
        type: Sequelize.STRING
      },
      fecha: {
        type: Sequelize.STRING
      },
      hora_id: {
        type: Sequelize.INTEGER
      },
      medico_id: {
        type: Sequelize.INTEGER
      },
      especialidad_id: {
        type: Sequelize.INTEGER
      },
      paciente_id: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Citas');
  }
};