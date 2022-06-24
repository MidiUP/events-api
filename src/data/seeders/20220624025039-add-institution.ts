
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('institution', [
      {
        name: 'Empresa Alfa',
        idCategoryInstitution: 1
      },
      {
        name: 'Empresa Beta',
        idCategoryInstitution: 1
      },
      {
        name: 'Empresa Gama',
        idCategoryInstitution: 1
      },
      {
        name: 'Universidade Estacio',
        idCategoryInstitution: 2
      },
      {
        name: 'Universidade Facid',
        idCategoryInstitution: 2
      },
      {
        name: 'Universidade Santo Agostinho',
        idCategoryInstitution: 2
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('institution', null, {});
  }
};
