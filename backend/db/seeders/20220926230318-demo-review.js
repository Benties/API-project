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
        stars: 5
      },
      {
        spotId: 1,
        userId: 2,
        review: `This Airbnb was the perfect spot for our NYC trip.
                The location was unbeatable, the apartment was clean and
                comfortable, and the host was so welcoming and helpful.
                Highly recommend!`,
        stars: 5
      },
      {
        spotId: 1,
        userId: 3,
        review: `Absolutely amazing stay in NYC! The apartment was clean, spacious, and in a
                great location. The host was super helpful and responsive. Would highly recommend this Airbnb.`,
        stars: 5
      },
      {
        spotId: 2,
        userId: 3,
        review: `This Airbnb was the perfect spot for our NYC trip.
                The location was unbeatable, the apartment was clean and comfortable,
                and the host was so welcoming and helpful. Highly recommend!`,
        stars: 5
      },
      {
        spotId: 2,
        userId: 4,
        review:`Absolutely amazing stay in NYC! The apartment was clean, spacious,
                and in a great location. The host was super helpful and responsive.
                Would highly recommend this Airbnb.`,
        stars: 5
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op
    return queryInterface.bulkDelete('Reviews', {
      spotId: { [Op.in]: [3, 4, 5]}
    }, {})
  }
};
