
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('institution', {
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
      idCategoryInstitution: {
        type: Sequelize.INTEGER,
        references: { model: 'category_institution', key: 'id' },
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    })
  },

  down: async (queryInterface) => {
    
    await queryInterface.dropTable('institution');

  }
};
