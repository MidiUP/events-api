
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('event', [
      {
        name: 'event 1',
        dateHour: '2022-06-10',
        availableTickets: 50,
        soldTickets: 0,
        idInstitution: 1,
      },
      {
        name: 'event 2',
        dateHour: '2022-06-11',
        availableTickets: 10,
        soldTickets: 5,
        idInstitution: 1,
      },
      {
        name: 'event 3',
        dateHour: '2022-06-12',
        availableTickets: 50,
        soldTickets: 50,
        idInstitution: 2,
      },
      {
        name: 'event 4',
        dateHour: '2022-06-13',
        availableTickets: 50,
        soldTickets: 2,
        idInstitution: 2,
      },
      {
        name: 'event 5',
        dateHour: '2022-06-25',
        availableTickets: 50,
        soldTickets: 20,
        idInstitution: 3,
      },
      {
        name: 'event 6',
        dateHour: '2022-06-30',
        availableTickets: 50,
        soldTickets: 48,
        idInstitution: 3,
      },
      {
        name: 'event 7',
        dateHour: '2022-07-01',
        availableTickets: 50,
        soldTickets: 3,
        idInstitution: 4,
      },
      {
        name: 'event 8',
        dateHour: '2022-07-07',
        availableTickets: 50,
        soldTickets: 0,
        idInstitution: 3,
      },
      {
        name: 'event 9',
        dateHour: '2022-07-07',
        availableTickets: 50,
        soldTickets: 0,
        idInstitution: 6,
      },
      {
        name: 'event 10',
        dateHour: '2022-08-08',
        availableTickets: 50,
        soldTickets: 5,
        idInstitution: 2,
      },
      {
        name: 'event 11',
        dateHour: '2022-08-01',
        availableTickets: 50,
        soldTickets: 0,
        idInstitution: 1,
      },
      {
        name: 'event 12',
        dateHour: '2022-08-05',
        availableTickets: 50,
        soldTickets: 5,
        idInstitution: 6,
      },
      {
        name: 'event 13',
        dateHour: '2022-08-20',
        availableTickets: 50,
        soldTickets: 0,
        idInstitution: 6,
      },
      {
        name: 'event 14',
        dateHour: '2022-08-10',
        availableTickets: 50,
        soldTickets: 5,
        idInstitution: 5,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('event', null, {});
  }
};
