'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('Agendamentos',
          { id: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true

            },

            date: {
              allowNull: false,
              type: Sequelize.DATE
            },

            user_id: {
              type: Sequelize.INTEGER,
              references: {
                model: 'Users' , key: 'id'
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL'
            },

            provider_id: {
              type: Sequelize.INTEGER,
              references: {
                model: 'Users' , key: 'id'
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL'
            },

            canceledAt: {
              type: Sequelize.DATE
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

      return queryInterface.dropTable('Agendamentos');

  }
};
