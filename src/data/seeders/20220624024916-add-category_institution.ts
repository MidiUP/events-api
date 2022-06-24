
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('category_institution', [
      {
        name: 'Empresa'
      },
      {
        name: 'Universidade'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('category_institution', null, {});
  }
};
