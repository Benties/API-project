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
        review: `I recently stayed at this Airbnb in New York City and it was absolutely wonderful!
                The location was perfect - just a short walk from all of the main attractions and the
                apartment itself was clean, spacious, and had everything we needed for a comfortable stay.
                The host was also very responsive and helpful with any questions we had. I would
                highly recommend this Airbnb to anyone visiting NYC.`,
        stars: 5
      },
      {
        spotId: 1,
        userId: 3,
        review: `We had a fantastic stay at this Airbnb in the heart of Manhattan.
                The apartment was small but perfectly appointed, with everything we needed for a comfortable stay. The location was unbeatable just a
                few blocks from Central Park and all the best restaurants and shops. Our host, was incredibly helpful and provided us with all
                the information we needed to make the most of our trip. We would definitely stay here again on our next visit to the city!`,
        stars: 5
      },
      {
        spotId: 2,
        userId: 3,
        review: `I recently stayed at this Airbnb in New York City and it was absolutely wonderful!
                The location was perfect - just a short walk from all of the main attractions and the
                apartment itself was clean, spacious, and had everything we needed for a comfortable stay.
                The host was also very responsive and helpful with any questions we had. I would
                highly recommend this Airbnb to anyone visiting NYC.`,
        stars: 5
      },
      {
        spotId: 2,
        userId: 4,
        review:`We had a fantastic stay at this Airbnb in the heart of Manhattan.
                The apartment was small but perfectly appointed, with everything we needed for a comfortable stay. The location was unbeatable just a
                few blocks from Central Park and all the best restaurants and shops. Our host, was incredibly helpful and provided us with all
                the information we needed to make the most of our trip. We would definitely stay here again on our next visit to the city!`,
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
