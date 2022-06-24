
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', [
      {
        name: 'mateus',
        email: 'mail@mail.com',
        password: '$2a$12$w7KA0YVvk0HLkR51KPvJce22laDAY2wUm6RBktP/SKBxBXKEWHshS'
      },
      {
        name: 'jessica',
        email: 'jessica@mail.com',
        password: '$2a$12$w7KA0YVvk0HLkR51KPvJce22laDAY2wUm6RBktP/SKBxBXKEWHshS'
      },
      {
        name: 'amanda',
        email: 'amanda@mail.com',
        password: '$2a$12$w7KA0YVvk0HLkR51KPvJce22laDAY2wUm6RBktP/SKBxBXKEWHshS'
      },
      {
        name: 'bruno',
        email: 'bruno@mail.com',
        password: '$2a$12$w7KA0YVvk0HLkR51KPvJce22laDAY2wUm6RBktP/SKBxBXKEWHshS'
      },
      {
        name: 'sergio',
        email: 'sergio@mail.com',
        password: '$2a$12$w7KA0YVvk0HLkR51KPvJce22laDAY2wUm6RBktP/SKBxBXKEWHshS'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
