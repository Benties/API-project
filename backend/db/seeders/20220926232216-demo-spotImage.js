'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://i.imgur.com/i9FRJEo.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://i.imgur.com/T8qZAX8.png',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://i.imgur.com/QVWNMRp.png',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://i.imgur.com/UTzFJJ0.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://i.imgur.com/bJhQYx1.jpg',
        preview: true
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op
    return queryInterface.bulkDelete('SpotImages', {
      spotId: { [Op.in]: [1, 2, 3, 4, 5]}
    }, {})
  }
};
