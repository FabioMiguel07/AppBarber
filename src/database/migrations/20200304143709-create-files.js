'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('Files',
          { id: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true

            },
            name: {
              type: Sequelize.STRING,
              allowNull: false
            },

            path: {
              type: Sequelize.STRING,
              allowNull: false,
            },

            createdAt: {
              type: Sequelize.DATE,
              allowNull: false
            },

            updatedAt: {
              type: Sequelize.DATE,
              allowNull: false
            }
          });


  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.dropTable('Files');

  }
};