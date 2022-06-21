
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
      date_hour: {
        type: Sequelize.DATE,
        allowNull: false
      },
      available_tickets: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sold_tickets: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      fk_id_institution: {
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
