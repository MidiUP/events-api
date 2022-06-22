
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('category_institution', {
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
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    })
  },

  down: async (queryInterface) => {
    
    await queryInterface.dropTable('category_institution');

  }
};
