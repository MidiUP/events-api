
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('event', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      dateHour: {
        type: Sequelize.DATE,
        allowNull: false
      },
      availableTickets: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      soldTickets: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      idInstitution: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'institution', key: 'id' },
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
      
    })
  },

  down: async (queryInterface) => {
    
    await queryInterface.dropTable('event');

  }
};
