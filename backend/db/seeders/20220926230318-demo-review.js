'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Reviews', [
      {
        spotId: 3,
        userId: 2,
        review: 'Dumbo Condos was a great place to stay at',
        stars: 5
      },
      {
        spotId: 4,
        userId: 3,
        review: 'Vessel Condos was a great place to stay at',
        stars: 4.5
      },
      {
        spotId: 5,
        userId: 4,
        review: 'One Manhattan Square was a great place to stay at',
        stars: 4.5
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op
    return queryInterface.bulkDelete('Reviews', {
      spotId: { [Op.in]: [3, 4, 5]}
    }, {})
  }
};
