'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Bookings', [
      {
        spotId: 3,
        userId: 2,
        startDate: new Date('January 1, 2023'),
        endDate: new Date('January 5, 2023'),
      },
      {
        spotId: 4,
        userId: 3,
        startDate: new Date('Febuary 1, 2023'),
        endDate: new Date('Febuary 5, 2023'),
      },
      {
        spotId: 5,
        userId: 4,
        startDate: new Date('March 1, 2023'),
        endDate: new Date('March 5, 2023'),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op
    return queryInterface.bulkDelete('Bookings', {
      spotId: { [Op.in]: [1, 2, 3]}
    }, {})
  }
};
